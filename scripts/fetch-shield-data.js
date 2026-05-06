/**
 * VYRION SHIELD — Data Fetch Script v1.1
 * File: scripts/fetch-shield-data.js
 * Runs via GitHub Actions (Node.js 20 — native fetch, no npm dependencies)
 *
 * Sources:
 *   USGS Earthquake Hazards  — M4.5+ global seismic events, past 14 days
 *   NASA EONET               — Open wildfire, storm, flood, volcanic events, past 14 days
 *
 * Threat Algorithm v1.1:
 *   M4.5–5.4 excluded as background seismicity (not scored)
 *   M5.5–5.9 → 0.25 pts · M6.0–6.9 → 1.5 pts · M7.0–7.9 → 3.5 pts · M8.0+ → 6.0 pts
 *   Wildfire → 0.35 pts · Storm → 0.90 pts · Flood → 0.45 pts · Volcanic → 1.10 pts
 *   NOMINAL <2 · WATCH 2–6 · ELEVATED 7–14 · CRITICAL 15+
 *
 * Output: data/shield-snapshot.json (committed to repo by GitHub Actions)
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';

// ─────────────────────────────────────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const WINDOW_DAYS     = 14;
const WINDOW_MS       = WINDOW_DAYS * 24 * 60 * 60 * 1000;
const OUTPUT_PATH     = 'data/shield-snapshot.json';
const FETCH_TIMEOUT   = 20000; // 20s

// EONET category IDs
const EONET_CATEGORIES = [
  { id: 'wildfires',    type: 'WILDFIRE',  label: 'Wildfire'      },
  { id: 'severeStorms', type: 'STORM',     label: 'Severe Storm'  },
  { id: 'floods',       type: 'FLOOD',     label: 'Flood'         },
  { id: 'volcanoes',    type: 'VOLCANIC',  label: 'Volcanic'      },
];

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function log(msg)  { console.log(`[SHIELD] ${msg}`); }
function warn(msg) { console.warn(`[SHIELD WARN] ${msg}`); }

function nowISO()   { return new Date().toISOString(); }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function daysAgo(n) { return new Date(Date.now() - n * 86400000).toISOString().slice(0, 10); }

async function safeFetch(url, label) {
  try {
    log(`Fetching: ${label}`);
    const r = await fetch(url, {
      headers: { 'User-Agent': 'VYRION-SHIELD-DataBot/1.1 (contact@vyrion.earth)' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r;
  } catch (e) {
    warn(`${label} — ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  THREAT ALGORITHM v1.1
//  Excludes M4.5–5.4 background seismicity from scoring
//  Thresholds: NOMINAL <2 · WATCH 2–6 · ELEVATED 7–14 · CRITICAL 15+
// ─────────────────────────────────────────────────────────────────────────────
function computeThreat(seismicEvents, eonetCounts) {
  let score = 0;

  // Seismic — M4.5-5.4 excluded (background seismicity)
  for (const eq of seismicEvents) {
    const mag = eq.magnitude || 0;
    if      (mag >= 8.0) score += 6.0;
    else if (mag >= 7.0) score += 3.5;
    else if (mag >= 6.0) score += 1.5;
    else if (mag >= 5.5) score += 0.25;
    // M4.5–5.4: 0 — excluded as background seismicity (v1.1)
  }

  // EONET hazards
  score += (eonetCounts.wildfire  || 0) * 0.35;
  score += (eonetCounts.storm     || 0) * 0.90;
  score += (eonetCounts.flood     || 0) * 0.45;
  score += (eonetCounts.volcanic  || 0) * 1.10;

  const level =
    score >= 15 ? 'CRITICAL' :
    score >= 7  ? 'ELEVATED' :
    score >= 2  ? 'WATCH'    :
                  'NOMINAL';

  return { level, score: parseFloat(score.toFixed(2)) };
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 1: USGS Earthquake Hazards Program
//  M4.5+ events — monthly feed, filtered to 14-day window
//  License: Public domain — U.S. Geological Survey
// ─────────────────────────────────────────────────────────────────────────────
async function fetchUSGS() {
  const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';
  const r   = await safeFetch(url, 'USGS M4.5+ Earthquake Feed');
  if (!r) return null;

  try {
    const d      = await r.json();
    const cutoff = Date.now() - WINDOW_MS;

    // Filter to 14-day window
    const features = (d.features || []).filter(f => f.properties.time > cutoff);

    // Normalize events
    const events = features.map(f => ({
      id:        f.id,
      magnitude: parseFloat((f.properties.mag || 0).toFixed(1)),
      place:     f.properties.place || '—',
      time:      new Date(f.properties.time).toISOString(),
      depth_km:  parseFloat((f.geometry?.coordinates?.[2] || 0).toFixed(1)),
      url:       f.properties.url || null,
    })).sort((a, b) => b.magnitude - a.magnitude); // largest first

    // Derived counts
    const largest = events[0] || null;
    const count_m55 = events.filter(e => e.magnitude >= 5.5).length;
    const count_m60 = events.filter(e => e.magnitude >= 6.0).length;
    const count_m70 = events.filter(e => e.magnitude >= 7.0).length;
    const count_m80 = events.filter(e => e.magnitude >= 8.0).length;

    log(`USGS: ${events.length} events (14d) · largest ${largest?.magnitude || '—'} · M6+: ${count_m60} · M7+: ${count_m70}`);

    return {
      events,
      count_total:    events.length,
      count_m55_plus: count_m55,
      count_m60_plus: count_m60,
      count_m70_plus: count_m70,
      count_m80_plus: count_m80,
      largest,
      source:   'USGS Earthquake Hazards Program',
      url:      'https://earthquake.usgs.gov/',
      feed_url: url,
      retrieved: nowISO(),
    };
  } catch (e) {
    warn(`USGS parse error: ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 2: NASA EONET — Open hazard events, past 14 days
//  Categories: wildfires, severeStorms, floods, volcanoes
//  License: Public domain — NASA Earth Observatory Natural Event Tracker
// ─────────────────────────────────────────────────────────────────────────────
async function fetchEONET() {
  const url = `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=200&days=${WINDOW_DAYS}`;
  const r   = await safeFetch(url, 'NASA EONET Open Events');
  if (!r) return null;

  try {
    const d      = await r.json();
    const allEvents = d.events || [];

    const result = {};

    for (const cat of EONET_CATEGORIES) {
      const filtered = allEvents.filter(e =>
        e.categories?.some(c => c.id === cat.id)
      );

      const events = filtered.map(e => {
        const geom   = e.geometry?.[0] || null;
        const coords = geom?.coordinates || null;
        return {
          id:         e.id,
          title:      e.title,
          type:       cat.type,
          time:       geom?.date ? new Date(geom.date).toISOString() : null,
          coords:     coords ? [
            parseFloat(coords[0].toFixed(3)),
            parseFloat(coords[1].toFixed(3)),
          ] : null,
          closed:     e.closed || null,
        };
      }).sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return new Date(b.time) - new Date(a.time);
      });

      log(`EONET ${cat.label}: ${events.length} open events`);

      result[cat.type.toLowerCase()] = {
        events,
        count: events.length,
      };
    }

    return {
      ...result,
      source:    'NASA Earth Observatory Natural Event Tracker (EONET) v3',
      url:       'https://eonet.gsfc.nasa.gov/',
      retrieved: nowISO(),
    };
  } catch (e) {
    warn(`EONET parse error: ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  LOAD PREVIOUS SNAPSHOT — preserve last good data on partial failures
// ─────────────────────────────────────────────────────────────────────────────
function loadPreviousSnapshot() {
  if (!existsSync(OUTPUT_PATH)) return null;
  try {
    return JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'));
  } catch (e) {
    warn('Could not parse previous shield-snapshot.json');
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  log('=== SHIELD Data Refresh Starting (v1.1) ===');
  const startTime = Date.now();

  const prev = loadPreviousSnapshot();

  // Fetch both sources concurrently
  log('Fetching USGS + NASA EONET in parallel...');
  const [usgsResult, eonetResult] = await Promise.allSettled([
    fetchUSGS(),
    fetchEONET(),
  ]);

  const seismic = usgsResult.status  === 'fulfilled' ? usgsResult.value  : null;
  const eonet   = eonetResult.status === 'fulfilled' ? eonetResult.value : null;

  // Fall back to previous data on failure — never write empty snapshot
  const seismicData = seismic || prev?.seismic || null;
  const eonetData   = eonet   || prev?.eonet   || null;

  if (!seismicData && !eonetData) {
    warn('Both sources failed and no previous snapshot available — aborting write');
    process.exit(1);
  }

  if (!seismic) warn('USGS fetch failed — using previous seismic data');
  if (!eonet)   warn('EONET fetch failed — using previous EONET data');

  // Compute threat level from live or fallback data
  const seismicEvents = seismicData?.events || [];
  const eonetCounts = {
    wildfire: eonetData?.wildfire?.count  || 0,
    storm:    eonetData?.storm?.count     || 0,
    flood:    eonetData?.flood?.count     || 0,
    volcanic: eonetData?.volcanic?.count  || 0,
  };

  const threat = computeThreat(seismicEvents, eonetCounts);

  // Build window metadata
  const windowStart = new Date(Date.now() - WINDOW_MS).toISOString().slice(0, 10);
  const windowEnd   = todayISO();

  // Assemble snapshot
  const snapshot = {
    meta: {
      generated:        nowISO(),
      generated_date:   todayISO(),
      script_version:   '1.1',
      window_days:      WINDOW_DAYS,
      window_start:     windowStart,
      window_end:       windowEnd,
      runtime_ms:       Date.now() - startTime,
      seismic_live:     !!seismic,
      eonet_live:       !!eonet,
    },
    threat,
    seismic:  seismicData,
    wildfire: eonetData?.wildfire  || null,
    storm:    eonetData?.storm     || null,
    flood:    eonetData?.flood     || null,
    volcanic: eonetData?.volcanic  || null,
  };

  // Write output
  const json = JSON.stringify(snapshot, null, 2);
  writeFileSync(OUTPUT_PATH, json, 'utf8');

  const elapsed = Date.now() - startTime;
  log(`=== Complete in ${elapsed}ms ===`);
  log(`Output: ${OUTPUT_PATH} (${json.length.toLocaleString()} bytes)`);

  // Summary
  console.log('\n── SUMMARY ────────────────────────────────────────────────');
  console.log(`Threat Level:  ${threat.level} (score ${threat.score})`);
  console.log(`Seismic:       ${seismicData?.count_total ?? '—'} events (14d) · M6+: ${seismicData?.count_m60_plus ?? '—'} · M7+: ${seismicData?.count_m70_plus ?? '—'}`);
  console.log(`Wildfire:      ${eonetCounts.wildfire} active events`);
  console.log(`Storm:         ${eonetCounts.storm} active events`);
  console.log(`Flood:         ${eonetCounts.flood} active events`);
  console.log(`Volcanic:      ${eonetCounts.volcanic} active events`);
  console.log(`Live sources:  USGS ${seismic ? '✓' : '✗ (fallback)'} · EONET ${eonet ? '✓' : '✗ (fallback)'}`);
  console.log('────────────────────────────────────────────────────────────\n');
}

main().catch(e => {
  console.error('[SHIELD FATAL]', e);
  process.exit(1);
});
