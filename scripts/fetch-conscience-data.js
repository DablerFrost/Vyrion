/**
 * ══════════════════════════════════════════════════════════════════
 *  VYRION CONSCIENCE + INDEX — Data Fetch Script v2.0
 *  File: scripts/fetch-conscience-data.js
 *  Runs via GitHub Actions (Node.js 20 — native fetch, zero dependencies)
 *  Schedule: conscience-daily.yml → 00:05 UTC daily
 * ══════════════════════════════════════════════════════════════════
 *
 *  VYRION INDEX — Automated Daily Computation
 *  Formula: S_final = Σ(W_i × S_i)
 *  Weights: ATM 22% · OCN 18% · ICE 14% · FST 13% · BIO 12% · FW 10% · SOL 7% · CORP 4%
 *  Uncertainty: ±1.8 (fixed, propagated per VYRION-METHODOLOGY-v1.0.md)
 *  Minimum detectable change: ±0.5
 *  Baseline: pre-industrial 1850–1900 average = 100/100
 *
 *  LIVE INDICATORS (fetched and scored daily):
 *    A1  — CO₂ ppm          · NOAA GML Mauna Loa          · Atmosphere system
 *    O1  — Global temp anomaly · NOAA NCEI                 · Ocean system
 *    C1  — Arctic ice extent · NSIDC Sea Ice Index          · Cryosphere system
 *    C2  — Antarctic extent  · NSIDC Sea Ice Index          · Cryosphere system
 *    F3  — Active wildfires  · NASA EONET                   · Forest system
 *    W1  — Soil moisture     · Open-Meteo ERA5 (proxy)      · Freshwater system
 *
 *  STORED (not yet scored, stored for transparency):
 *    B5  — Occurrence count  · GBIF API                     · Biodiversity reference
 *    CA5 — 8-K event density · SEC EDGAR (11 companies)     · Corp. Accountability
 *
 *  FIXED SYSTEM SCORES (monthly/annual indicators only, held at last-known):
 *    Soil Health:             33.0 — FAO GSOC / SoilGrids (annual)
 *    Biodiversity:            44.0 — IUCN / WWF LPI (annual)
 *    Corporate Accountability: 38.6 — VYRION CONSCIENCE mean (updated manually)
 *
 *  Output: conscience-data.json (repo root — served at vyrion.earth/conscience-data.json)
 *
 *  Sources: all public-domain or open-license. No proprietary data.
 *  Open Proof Protocol: contact@vyrion.earth · corrections published within 24h
 * ══════════════════════════════════════════════════════════════════
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';

// ─────────────────────────────────────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const OUTPUT_PATH      = 'conscience-data.json';
const FETCH_TIMEOUT    = 20000;   // 20s per request
const SCRIPT_VERSION   = '2.0';
const DAY_ONE_ISO      = '2026-03-18T00:00:00-10:00'; // Hawaii time — locked

// VYRION Index system weights — locked per methodology v1.0
const WEIGHTS = {
  atmosphere:    0.22,
  ocean:         0.18,
  ice:           0.14,
  forest:        0.13,
  biodiversity:  0.12,
  freshwater:    0.10,
  soil:          0.07,
  corporate:     0.04
};

// Each system has 6 indicators — live indicator weight within system = 1/6
const LIVE_INDICATOR_WEIGHT = 1 / 6;

// EDGAR company registry — 11 tracked companies
const COMPANIES = [
  { id: 'exxon',     name: 'ExxonMobil',    ticker: 'XOM',  cik: '0000034088' },
  { id: 'bp',        name: 'BP',            ticker: 'BP',   cik: '0000313807' },
  { id: 'shell',     name: 'Shell',         ticker: 'SHEL', cik: '0000806517' },
  { id: 'delta',     name: 'Delta Air Lines',ticker: 'DAL', cik: '0000027904' },
  { id: 'starbucks', name: 'Starbucks',     ticker: 'SBUX', cik: '0000829224' },
  { id: 'walmart',   name: 'Walmart',       ticker: 'WMT',  cik: '0000104169' },
  { id: 'meta',      name: 'Meta',          ticker: 'META', cik: '0001326801' },
  { id: 'amazon',    name: 'Amazon',        ticker: 'AMZN', cik: '0001018724' },
  { id: 'microsoft', name: 'Microsoft',     ticker: 'MSFT', cik: '0000789019' },
  { id: 'unilever',  name: 'Unilever',      ticker: 'ULVR', cik: '0000049519' },
  { id: 'apple',     name: 'Apple',         ticker: 'AAPL', cik: '0000320193' }
];

// Arctic seasonal climatological baselines (1981–2010 mean, millions km²)
// Source: NSIDC Sea Ice Index
const ARCTIC_SEASONAL_BASELINES = {
  1: 13.82, 2: 14.90, 3: 15.45, 4: 14.37, 5: 12.35,
  6:  9.82, 7:  7.60, 8:  6.22, 9:  6.08, 10:  7.88,
  11: 10.52, 12: 12.35
};

// Antarctic seasonal climatological baselines (1981–2010 mean, millions km²)
const ANTARCTIC_SEASONAL_BASELINES = {
  1:  3.83, 2:  3.06, 3:  3.64, 4:  6.07, 5:  9.27,
  6: 12.28, 7: 14.10, 8: 15.22, 9: 16.45, 10: 16.25,
  11: 13.56, 12:  8.34
};

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function log(msg)  { console.log(`[VYRION] ${msg}`); }
function warn(msg) { console.warn(`[VYRION WARN] ${msg}`); }

function nowISO()   { return new Date().toISOString(); }
function todayISO() { return new Date().toISOString().slice(0, 10); }

function daysAgoISO(n) {
  return new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
}

function currentMonth() { return new Date().getMonth() + 1; } // 1-12

// Dynamic day number — computed from origin date, never stale
function getDayNumber() {
  const d1 = new Date(DAY_ONE_ISO);
  return Math.max(1, Math.floor((Date.now() - d1.getTime()) / 86400000) + 1);
}

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

async function safeFetch(url, label) {
  try {
    log(`Fetching: ${label}`);
    const r = await fetch(url, {
      headers: { 'User-Agent': 'VYRION-CONSCIENCE-DataBot/2.0 (contact@vyrion.earth)' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT)
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r;
  } catch(e) {
    warn(`${label} — ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  SCORING FUNCTIONS — per VYRION-METHODOLOGY-v1.0.md
//  Each returns 0–100 where 100 = pre-industrial baseline (healthy)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A1 — Atmospheric CO₂ (ppm)
 * Source: VYRION-METHODOLOGY-v1.0.md §Atmosphere
 * Baseline: ~280 ppm (pre-industrial 1850-1900)
 * Danger threshold: 450 ppm
 */
function scoreA1_CO2(ppm) {
  // S_A1 = max(0, min(100, 100 - ((CO₂ - 280) / (450 - 280)) × 100))
  return clamp(100 - ((ppm - 280) / (450 - 280)) * 100, 0, 100);
  // At 280 ppm: 100 (baseline) · At 433.95 ppm: ~9.4 · At 450+ ppm: 0
}

/**
 * O1 — Global Surface Temperature Anomaly (°C vs 1901-2000 baseline)
 * Source: NOAA NCEI Global Temperature
 * Pre-industrial mapping: NOAA baseline ~0.0°C → VYRION pre-industrial 1850-1900
 * Note: offset applied — 1850-1900 was ~0.3°C cooler than 1901-2000 NOAA baseline
 */
function scoreO1_TempAnomaly(anomalyC_vs_20thC) {
  // Adjust to pre-industrial: add ~0.3°C offset (1901-2000 is warmer than 1850-1900)
  const anomalyC_vs_preIndustrial = anomalyC_vs_20thC + 0.3;
  // Score: 100 at 0.0°C anomaly, 0 at +2.0°C anomaly
  return clamp(100 - (anomalyC_vs_preIndustrial / 2.0) * 100, 0, 100);
  // At +1.2°C (pre-industrial): score ~40 — consistent with Ocean system ~34
}

/**
 * C1 — Arctic Sea Ice Extent (millions km²)
 * Source: NSIDC Sea Ice Index G02135 v3.0
 * Baseline: 1981–2010 seasonal climatological mean
 * Seasonal adjustment: compare against monthly baseline
 */
function scoreC1_ArcticIce(extent_Mkm2, month) {
  const baseline = ARCTIC_SEASONAL_BASELINES[month] || 10.0;
  // Deficit as fraction of seasonal baseline
  const deficit = Math.max(0, baseline - extent_Mkm2) / baseline;
  // Scale: full deficit (extent=0) → score 0; at baseline → score 100
  // Scaling factor 2.5 means 40% below baseline = score 0
  return clamp(100 - deficit * 250, 0, 100);
}

/**
 * C2 — Antarctic Sea Ice Extent (millions km²)
 * Source: NSIDC Sea Ice Index G02135 v3.0
 * Same approach as C1 with Antarctic seasonal baselines
 */
function scoreC2_AntarcticIce(extent_Mkm2, month) {
  const baseline = ANTARCTIC_SEASONAL_BASELINES[month] || 10.0;
  const deficit = Math.max(0, baseline - extent_Mkm2) / baseline;
  return clamp(100 - deficit * 250, 0, 100);
}

/**
 * F3 — Active Wildfire Event Count
 * Source: NASA EONET v3
 * Baseline: historically ~5-8 concurrent open wildfire events globally
 * Scale: each additional event above baseline reduces score
 */
function scoreF3_Wildfire(count) {
  const baseline = 6;   // historic mean open events
  const ceiling  = 80;  // severe: 80+ concurrent events → score 0
  if (count <= baseline) return 100;
  return clamp(100 - ((count - baseline) / (ceiling - baseline)) * 100, 0, 100);
  // At 22 fires: 100 - (16/74)*100 = 78.4
  // At 50 fires: 100 - (44/74)*100 = 40.5
}

/**
 * W1 — Soil Moisture (m³/m³) — Freshwater system proxy
 * Source: Open-Meteo ERA5 Reanalysis (multi-coordinate sample average)
 * Baseline: ~0.25 m³/m³ (global optimal average)
 * Note: this is a proxy for SPEI drought index — Phase 3 will use direct SPEI API
 */
function scoreW1_SoilMoisture(moisture_avg) {
  const baseline = 0.25;  // m³/m³ optimal
  const minimum  = 0.05;  // severely dry
  const maximum  = 0.45;  // waterlogged
  if (moisture_avg >= baseline && moisture_avg <= maximum) {
    // Above optimal — small bonus capped at 100
    return Math.min(100, 100 + (moisture_avg - baseline) * 50);
  }
  if (moisture_avg < baseline) {
    // Below optimal — drought conditions reduce score
    return clamp(((moisture_avg - minimum) / (baseline - minimum)) * 100, 0, 100);
  }
  // Flooding above maximum
  return clamp(100 - (moisture_avg - maximum) * 200, 0, 100);
}

/**
 * System score delta computation
 * When a live indicator updates, the system score shifts by (new - old) / 6
 * (6 = number of indicators per system; live indicator = 1/6 of system weight)
 *
 * @param {number} newLiveScore    — newly computed live indicator score (0-100)
 * @param {number} oldLiveScore    — previous live indicator score (0-100)
 * @param {number} oldSystemScore  — previous full system composite score (0-100)
 * @returns {number}               — updated system score (0-100)
 */
function updateSystemScore(newLiveScore, oldLiveScore, oldSystemScore) {
  const delta = (newLiveScore - oldLiveScore) * LIVE_INDICATOR_WEIGHT;
  return clamp(oldSystemScore + delta, 0, 100);
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 1: NOAA GML — Atmospheric CO₂ (daily)
//  License: Public domain — NOAA Earth System Research Laboratories
// ─────────────────────────────────────────────────────────────────────────────
async function fetchCO2() {
  const url = 'https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_daily_mlo.txt';
  const r = await safeFetch(url, 'NOAA GML CO₂ — Mauna Loa');
  if (!r) return null;
  try {
    const txt = await r.text();
    const lines = txt.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    for (let i = lines.length - 1; i >= 0; i--) {
      const p = lines[i].trim().split(/\s+/);
      if (p.length >= 5) {
        const v = parseFloat(p[4]);
        if (!isNaN(v) && v > 0) {
          const ppm = parseFloat(v.toFixed(2));
          const date = `${p[0]}-${p[1].padStart(2,'0')}-${p[2].padStart(2,'0')}`;
          log(`CO₂: ${ppm} ppm · ${date}`);
          return { ppm, date, score: parseFloat(scoreA1_CO2(ppm).toFixed(2)) };
        }
      }
    }
  } catch(e) { warn(`CO₂ parse: ${e.message}`) }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 2: NOAA NCEI — Global Temperature Anomaly (monthly)
//  License: Public domain — NOAA National Centers for Environmental Information
// ─────────────────────────────────────────────────────────────────────────────
async function fetchGlobalTempAnomaly() {
  const year = new Date().getFullYear();
  const url  = `https://www.ncei.noaa.gov/cag/global/time-series/globe/land_ocean/ytd/1/${year}.json`;
  const r    = await safeFetch(url, 'NOAA NCEI Global Temperature Anomaly');
  if (!r) return null;
  try {
    const d = await r.json();
    const data = d?.data;
    if (!data) throw new Error('No data object');
    const keys = Object.keys(data).sort();
    const latest = keys[keys.length - 1];
    const anomaly = parseFloat(data[latest]);
    if (isNaN(anomaly)) throw new Error('Invalid anomaly value');
    log(`Global Temp Anomaly: +${anomaly}°C · Period: ${latest}`);
    return {
      anomaly_c:    anomaly,
      period:       latest,
      baseline:     '1901-2000 (NOAA NCEI)',
      score:        parseFloat(scoreO1_TempAnomaly(anomaly).toFixed(2))
    };
  } catch(e) { warn(`Global Temp parse: ${e.message}`) }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 3 & 4: NSIDC — Arctic + Antarctic Sea Ice Extent (daily)
//  License: Public domain — National Snow and Ice Data Center
//  Source: Sea Ice Index G02135 v3.0
// ─────────────────────────────────────────────────────────────────────────────
async function fetchSeaIceExtent(hemisphere) {
  const prefix = hemisphere === 'north' ? 'N' : 'S';
  const label  = hemisphere === 'north' ? 'Arctic' : 'Antarctic';
  const url    = `https://noaadata.apps.nsidc.org/NOAA/G02135/${hemisphere}/daily/data/${prefix}_seaice_extent_daily_v3.0.csv`;
  const r      = await safeFetch(url, `NSIDC ${label} Sea Ice Extent`);
  if (!r) return null;
  try {
    const txt   = await r.text();
    const lines = txt.split('\n').filter(l => l.trim() && !l.match(/^(Year|#)/i));
    // Walk backwards for most recent valid entry
    for (let i = lines.length - 1; i >= 0; i--) {
      const p = lines[i].split(',').map(s => s.trim());
      if (p.length >= 4) {
        const year  = parseInt(p[0]);
        const month = parseInt(p[1]);
        const day   = parseInt(p[2]);
        const ext   = parseFloat(p[3]);
        const miss  = parseFloat(p[4] || '0');
        if (!isNaN(ext) && ext > 0 && miss < 999) {
          const date     = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const baseline = hemisphere === 'north'
            ? ARCTIC_SEASONAL_BASELINES[month]
            : ANTARCTIC_SEASONAL_BASELINES[month];
          const anomaly  = parseFloat((ext - baseline).toFixed(3));
          const score    = hemisphere === 'north'
            ? parseFloat(scoreC1_ArcticIce(ext, month).toFixed(2))
            : parseFloat(scoreC2_AntarcticIce(ext, month).toFixed(2));
          log(`${label} Ice: ${ext}M km² · Anomaly: ${anomaly>0?'+':''}${anomaly}M km² · ${date}`);
          return { extent_mkm2: ext, date, month, baseline_mkm2: baseline, anomaly_mkm2: anomaly, score };
        }
      }
    }
  } catch(e) { warn(`${label} Ice parse: ${e.message}`) }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 5: NASA EONET — Active Wildfire Events (daily)
//  License: Public domain — NASA Earth Observatory Natural Event Tracker
// ─────────────────────────────────────────────────────────────────────────────
async function fetchWildfires() {
  const url = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&category=wildfires&limit=200&days=14';
  const r   = await safeFetch(url, 'NASA EONET Wildfires');
  if (!r) return null;
  try {
    const d      = await r.json();
    const events = d.events || [];
    const count  = events.length;
    const titles = events.slice(0, 5).map(e => e.title.slice(0, 40));
    log(`Wildfires: ${count} active events (14-day window)`);
    return {
      count,
      score:   parseFloat(scoreF3_Wildfire(count).toFixed(2)),
      sample:  titles,
      source:  'NASA EONET v3',
      window:  '14 days'
    };
  } catch(e) { warn(`Wildfire parse: ${e.message}`) }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 6: Open-Meteo ERA5 — Soil Moisture (Freshwater proxy)
//  License: CC BY 4.0 — Open-Meteo / ECMWF ERA5 Reanalysis
//  Note: ERA5 has 3–5 day lag. Using dynamic dates with sufficient lookback.
//  Phase 3 target: replace with SPEI Global Drought Monitor direct API.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchSoilMoisture() {
  // ERA5 has lag — use 3–10 days ago window
  const endDate   = daysAgoISO(3);
  const startDate = daysAgoISO(10);
  // Sample 6 representative coordinates: tropics, mid-latitudes, southern hemisphere
  const lats = '55,30,0,-15,-35,20';
  const lons  = '10,-100,45,130,-60,80';
  const url   = `https://archive-api.open-meteo.com/v1/archive?latitude=${lats}&longitude=${lons}&start_date=${startDate}&end_date=${endDate}&daily=soil_moisture_0_to_7cm_mean&timezone=UTC`;
  const r     = await safeFetch(url, 'Open-Meteo ERA5 Soil Moisture');
  if (!r) return null;
  try {
    const d = await r.json();
    // API returns array of results for each location
    const results = Array.isArray(d) ? d : [d];
    const allValues = [];
    results.forEach(loc => {
      const daily = loc?.daily?.soil_moisture_0_to_7cm_mean;
      if (Array.isArray(daily)) {
        daily.forEach(v => { if (v !== null && !isNaN(v)) allValues.push(v); });
      }
    });
    if (allValues.length === 0) throw new Error('No soil moisture values');
    const avg = allValues.reduce((a, b) => a + b, 0) / allValues.length;
    log(`Soil Moisture: ${avg.toFixed(4)} m³/m³ avg · ${allValues.length} readings · ${startDate} to ${endDate}`);
    return {
      moisture_avg_m3:  parseFloat(avg.toFixed(4)),
      period:           `${startDate} to ${endDate}`,
      sample_count:     allValues.length,
      baseline_m3:      0.25,
      baseline_note:    'Proxy baseline — ERA5 global optimal estimate. Phase 3: SPEI direct.',
      score:            parseFloat(scoreW1_SoilMoisture(avg).toFixed(2)),
      source:           'Open-Meteo ERA5 Reanalysis (ECMWF)',
      license:          'CC BY 4.0'
    };
  } catch(e) { warn(`Soil Moisture parse: ${e.message}`) }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 7: GBIF — Occurrence Count (reference, not yet scored)
//  License: CC BY 4.0 — Global Biodiversity Information Facility
//  Note: stored as institutional reference. B5 scoring requires historical
//  comparison series — Phase 3 implementation.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchGBIF() {
  const url = 'https://api.gbif.org/v1/occurrence/count';
  const r   = await safeFetch(url, 'GBIF Occurrence Count');
  if (!r) return null;
  try {
    const txt   = await r.text();
    const count = parseInt(txt.trim());
    if (isNaN(count)) throw new Error('Non-integer response');
    log(`GBIF Total Occurrences: ${count.toLocaleString()}`);
    return {
      total_occurrences: count,
      note:              'Reference value — B5 scoring requires historical comparison. Phase 3.',
      source:            'GBIF.org',
      license:           'CC BY 4.0'
    };
  } catch(e) { warn(`GBIF parse: ${e.message}`) }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 8: SEC EDGAR — Corporate Filing Dates + 8-K Density (daily)
//  License: Public domain — U.S. Securities and Exchange Commission
// ─────────────────────────────────────────────────────────────────────────────
async function fetchEdgar(company) {
  const url = `https://data.sec.gov/submissions/CIK${company.cik}.json`;
  const r   = await safeFetch(url, `SEC EDGAR ${company.ticker}`);
  if (!r) return null;
  try {
    const d     = await r.json();
    const forms = d.filings.recent.form;
    const dates = d.filings.recent.filingDate;
    const accs  = d.filings.recent.accessionNumber;
    const cutoff90 = new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10);
    let annual = null, k8count = 0, k8recent = null, k8items = [];
    for (let i = 0; i < forms.length; i++) {
      if (!annual && (forms[i] === '10-K' || forms[i] === '20-F')) {
        annual = { form: forms[i], date: dates[i] };
      }
      if (forms[i] === '8-K') {
        if (!k8recent) k8recent = dates[i];
        if (dates[i] >= cutoff90) {
          k8count++;
          if (k8items.length < 5) k8items.push({ date: dates[i], items: d.filings.recent.items?.[i] || '' });
        }
      }
      if (annual && dates[i] < cutoff90 && k8count > 0) break;
    }
    return {
      name:             company.name,
      ticker:           company.ticker,
      cik:              company.cik.replace(/^0+/, ''),
      edgar: {
        ticker:         company.ticker,
        cik:            company.cik.replace(/^0+/, ''),
        annual_filing:  annual || null,
        latest_8k:      k8items[0] || null,
        count_8k_90d:   k8count,
        recent_8k_items: k8items,
        retrieved:      nowISO()
      }
    };
  } catch(e) {
    warn(`EDGAR ${company.ticker}: ${e.message}`);
    return { name: company.name, ticker: company.ticker, cik: company.cik.replace(/^0+/, ''), edgar: null };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  LOAD PREVIOUS DATA — fallback values for last-known system scores
// ─────────────────────────────────────────────────────────────────────────────
function loadPreviousData() {
  if (!existsSync(OUTPUT_PATH)) return null;
  try {
    return JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'));
  } catch(e) {
    warn(`Could not parse previous ${OUTPUT_PATH}: ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  VYRION INDEX COMPUTATION
//  S_final = Σ(W_i × S_i) where S_i are per-system scores (0–100)
// ─────────────────────────────────────────────────────────────────────────────
function computeVyrionIndex(liveIndicators, prev) {

  // Load last-known system scores — defaults from published Day 1 values
  const prevIndex = prev?.vyrion_index;
  const prevComp  = prevIndex?.components || {};
  const prevInd   = prevIndex?.indicator_scores || {};

  // Default system scores (published, derived from full 6-indicator composites)
  const defaults = {
    atmosphere:   prevComp.atmosphere?.score   ?? 31.0,
    ocean:        prevComp.ocean?.score        ?? 34.0,
    ice:          prevComp.ice?.score          ?? 38.0,
    forest:       prevComp.forest?.score       ?? 47.0,
    biodiversity: prevComp.biodiversity?.score ?? 44.0,
    freshwater:   prevComp.freshwater?.score   ?? 29.0,
    soil:         prevComp.soil?.score         ?? 33.0,
    corporate:    prevComp.corporate?.score    ?? 38.6
  };

  // Default last-known indicator scores for delta computation
  const prevA1  = prevInd.A1_co2            ?? scoreA1_CO2(424.9);
  const prevO1  = prevInd.O1_temp_anomaly   ?? scoreO1_TempAnomaly(0.9);
  const prevC1  = prevInd.C1_arctic         ?? 55.0;
  const prevC2  = prevInd.C2_antarctic      ?? 42.0;
  const prevF3  = prevInd.F3_wildfire       ?? scoreF3_Wildfire(20);
  const prevW1  = prevInd.W1_soil_moisture  ?? scoreW1_SoilMoisture(0.20);

  // Build updated system scores using live indicators
  const systems = { ...defaults };
  const newIndicatorScores = { ...prevInd };
  const indicatorStatus = {};

  // ── ATMOSPHERE (22%) — A1: CO₂
  if (liveIndicators.co2) {
    const newA1 = liveIndicators.co2.score;
    systems.atmosphere = parseFloat(updateSystemScore(newA1, prevA1, defaults.atmosphere).toFixed(2));
    newIndicatorScores.A1_co2 = newA1;
    indicatorStatus.A1_co2 = { live: true, value: liveIndicators.co2.ppm, score: newA1, unit: 'ppm', source: 'NOAA GML' };
    log(`Atmosphere: A1 CO₂ score ${newA1.toFixed(1)} → system ${systems.atmosphere}`);
  } else {
    indicatorStatus.A1_co2 = { live: false, score: prevA1, note: 'Using previous value' };
  }

  // ── OCEAN (18%) — O1: Global Temperature Anomaly
  if (liveIndicators.tempAnomaly) {
    const newO1 = liveIndicators.tempAnomaly.score;
    systems.ocean = parseFloat(updateSystemScore(newO1, prevO1, defaults.ocean).toFixed(2));
    newIndicatorScores.O1_temp_anomaly = newO1;
    indicatorStatus.O1_temp_anomaly = { live: true, value: liveIndicators.tempAnomaly.anomaly_c, score: newO1, unit: '°C anomaly', source: 'NOAA NCEI' };
    log(`Ocean: O1 temp anomaly score ${newO1.toFixed(1)} → system ${systems.ocean}`);
  } else {
    indicatorStatus.O1_temp_anomaly = { live: false, score: prevO1, note: 'Using previous value' };
  }

  // ── ICE & CRYOSPHERE (14%) — C1+C2: Arctic + Antarctic ice extent
  // Both are in the same system — average their scores, treat combined as the live indicator
  const arcticAvail    = !!liveIndicators.arctic;
  const antarcticAvail = !!liveIndicators.antarctic;
  if (arcticAvail || antarcticAvail) {
    const newC1 = arcticAvail    ? liveIndicators.arctic.score    : prevC1;
    const newC2 = antarcticAvail ? liveIndicators.antarctic.score : prevC2;
    // Combined ice live score: average of C1 and C2 (both are live daily indicators for this system)
    const combinedIceLive = (newC1 + newC2) / 2;
    const combinedOldLive = (prevC1 + prevC2) / 2;
    // Ice has 2 live indicators — their combined weight within system = 2/6
    const delta = (combinedIceLive - combinedOldLive) * (2 / 6);
    systems.ice = parseFloat(clamp(defaults.ice + delta, 0, 100).toFixed(2));
    newIndicatorScores.C1_arctic    = newC1;
    newIndicatorScores.C2_antarctic = newC2;
    indicatorStatus.C1_arctic    = arcticAvail
      ? { live: true, value: liveIndicators.arctic.extent_mkm2, score: newC1, unit: 'M km²', source: 'NSIDC' }
      : { live: false, score: prevC1 };
    indicatorStatus.C2_antarctic = antarcticAvail
      ? { live: true, value: liveIndicators.antarctic.extent_mkm2, score: newC2, unit: 'M km²', source: 'NSIDC' }
      : { live: false, score: prevC2 };
    log(`Ice: C1 arctic ${newC1.toFixed(1)} + C2 antarctic ${newC2.toFixed(1)} → system ${systems.ice}`);
  } else {
    indicatorStatus.C1_arctic    = { live: false, score: prevC1, note: 'Using previous value' };
    indicatorStatus.C2_antarctic = { live: false, score: prevC2, note: 'Using previous value' };
  }

  // ── FOREST (13%) — F3: Active wildfire count
  if (liveIndicators.wildfire) {
    const newF3 = liveIndicators.wildfire.score;
    systems.forest = parseFloat(updateSystemScore(newF3, prevF3, defaults.forest).toFixed(2));
    newIndicatorScores.F3_wildfire = newF3;
    indicatorStatus.F3_wildfire = { live: true, value: liveIndicators.wildfire.count, score: newF3, unit: 'active events', source: 'NASA EONET' };
    log(`Forest: F3 wildfire score ${newF3.toFixed(1)} → system ${systems.forest}`);
  } else {
    indicatorStatus.F3_wildfire = { live: false, score: prevF3, note: 'Using previous value' };
  }

  // ── BIODIVERSITY (12%) — no live daily indicator in v2.0
  // B5 (GBIF) stored as reference — scoring requires historical series (Phase 3)
  indicatorStatus.B5_gbif = {
    live: false,
    note: 'Reference stored. B5 scoring requires historical comparison series — Phase 3.',
    source: 'GBIF'
  };

  // ── FRESHWATER (10%) — W1: Soil moisture (ERA5 proxy)
  if (liveIndicators.soilMoisture) {
    const newW1 = liveIndicators.soilMoisture.score;
    systems.freshwater = parseFloat(updateSystemScore(newW1, prevW1, defaults.freshwater).toFixed(2));
    newIndicatorScores.W1_soil_moisture = newW1;
    indicatorStatus.W1_soil_moisture = {
      live: true, value: liveIndicators.soilMoisture.moisture_avg_m3,
      score: newW1, unit: 'm³/m³', source: 'Open-Meteo ERA5',
      note: 'Proxy for SPEI drought index. Phase 3: SPEI Global Drought Monitor.'
    };
    log(`Freshwater: W1 soil moisture score ${newW1.toFixed(1)} → system ${systems.freshwater}`);
  } else {
    indicatorStatus.W1_soil_moisture = { live: false, score: prevW1, note: 'Using previous value' };
  }

  // ── SOIL (7%) — no daily indicator in v2.0 (FAO GSOC annual)
  // System score held at last known — annual update only
  indicatorStatus.S_soil = {
    live: false,
    note: 'FAO GSOC / SoilGrids — annual update only. Held at last-known value.',
    source: 'FAO'
  };

  // ── CORPORATE ACCOUNTABILITY (4%) — held at CONSCIENCE portfolio mean
  // CONSCIENCE scores update manually — not daily automated
  indicatorStatus.CA_conscience = {
    live: false,
    note: 'VYRION CONSCIENCE portfolio mean. Updates when company scores change.',
    value: 38.6,
    source: 'VYRION CONSCIENCE'
  };

  // ── COMPUTE S_FINAL ────────────────────────────────────────────────
  const S_final =
    (systems.atmosphere   * WEIGHTS.atmosphere)   +
    (systems.ocean        * WEIGHTS.ocean)         +
    (systems.ice          * WEIGHTS.ice)           +
    (systems.forest       * WEIGHTS.forest)        +
    (systems.biodiversity * WEIGHTS.biodiversity)  +
    (systems.freshwater   * WEIGHTS.freshwater)    +
    (systems.soil         * WEIGHTS.soil)          +
    (systems.corporate    * WEIGHTS.corporate);

  const score = parseFloat(clamp(S_final, 0, 100).toFixed(1));

  log(`\n── VYRION INDEX ────────────────────────────────────`);
  log(`  Atmosphere   (22%): ${systems.atmosphere}`);
  log(`  Ocean        (18%): ${systems.ocean}`);
  log(`  Ice          (14%): ${systems.ice}`);
  log(`  Forest       (13%): ${systems.forest}`);
  log(`  Biodiversity (12%): ${systems.biodiversity}`);
  log(`  Freshwater   (10%): ${systems.freshwater}`);
  log(`  Soil          (7%): ${systems.soil}`);
  log(`  Corporate     (4%): ${systems.corporate}`);
  log(`  ─────────────────────────────────────────────────`);
  log(`  S_final = ${score} ± 1.8 / 100`);
  log(`  Day ${getDayNumber()} · ${todayISO()}`);
  log(`────────────────────────────────────────────────────\n`);

  return {
    score,
    uncertainty:      1.8,
    min_detectable:   0.5,
    dayNumber:        getDayNumber(),
    date:             todayISO(),
    computed:         true,
    methodology:      'https://github.com/DablerFrost/Vyrion/blob/main/docs/VYRION-METHODOLOGY-V1.0.md',
    formula:          'S_final = Σ(W_i × S_i)',
    components: {
      atmosphere:   { score: systems.atmosphere,   weight: WEIGHTS.atmosphere,   note: 'A1 CO₂ live · A2-A6 last-known' },
      ocean:        { score: systems.ocean,         weight: WEIGHTS.ocean,        note: 'O1 temp anomaly live · O2-O6 last-known' },
      ice:          { score: systems.ice,           weight: WEIGHTS.ice,          note: 'C1+C2 ice extents live · C3-C6 last-known' },
      forest:       { score: systems.forest,        weight: WEIGHTS.forest,       note: 'F3 wildfire count live · F1,F2,F4-F6 last-known' },
      biodiversity: { score: systems.biodiversity,  weight: WEIGHTS.biodiversity, note: 'No daily indicator in v2.0 · all last-known' },
      freshwater:   { score: systems.freshwater,    weight: WEIGHTS.freshwater,   note: 'W1 soil moisture proxy live · W2-W6 last-known' },
      soil:         { score: systems.soil,          weight: WEIGHTS.soil,         note: 'No daily indicator · held at last-known (annual)' },
      corporate:    { score: systems.corporate,     weight: WEIGHTS.corporate,    note: 'CONSCIENCE portfolio mean · held at last-known' }
    },
    indicator_scores:  newIndicatorScores,
    indicator_status:  indicatorStatus
  };
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  log('════════════════════════════════════════════════════');
  log('  VYRION CONSCIENCE + INDEX — Data Refresh v2.0');
  log(`  ${nowISO()}`);
  log('════════════════════════════════════════════════════\n');

  const startTime = Date.now();
  const prev      = loadPreviousData();

  // ── FETCH ALL SOURCES IN PARALLEL ─────────────────────────────────
  log('Fetching all sources in parallel…\n');

  const [
    co2Result,
    tempResult,
    arcticResult,
    antarcticResult,
    wildfireResult,
    soilResult,
    gbifResult,
    ...edgarResults
  ] = await Promise.allSettled([
    fetchCO2(),
    fetchGlobalTempAnomaly(),
    fetchSeaIceExtent('north'),
    fetchSeaIceExtent('south'),
    fetchWildfires(),
    fetchSoilMoisture(),
    fetchGBIF(),
    ...COMPANIES.map(co => fetchEdgar(co))
  ]);

  const resolve = r => r.status === 'fulfilled' ? r.value : null;

  const liveIndicators = {
    co2:          resolve(co2Result),
    tempAnomaly:  resolve(tempResult),
    arctic:       resolve(arcticResult),
    antarctic:    resolve(antarcticResult),
    wildfire:     resolve(wildfireResult),
    soilMoisture: resolve(soilResult)
  };

  const gbifData     = resolve(gbifResult);
  const edgarData    = edgarResults.map(r => resolve(r));

  // Log fetch summary
  const fetchLog = Object.entries(liveIndicators).map(([k, v]) => `${k}: ${v ? '✓' : '✗'}`).join(' · ');
  log(`\nFetch results — ${fetchLog}`);
  log(`GBIF: ${gbifData ? '✓' : '✗'} · EDGAR: ${edgarData.filter(Boolean).length}/${COMPANIES.length} ✓\n`);

  // ── COMPUTE VYRION INDEX ───────────────────────────────────────────
  const vyrionIndex = computeVyrionIndex(liveIndicators, prev);

  // ── BUILD COMPANIES OBJECT ─────────────────────────────────────────
  const companies = {};
  COMPANIES.forEach((co, i) => {
    const data = edgarData[i];
    if (data) {
      companies[co.id] = data;
    } else {
      // Fallback to previous data
      companies[co.id] = prev?.companies?.[co.id] || {
        name: co.name, ticker: co.ticker, cik: co.cik.replace(/^0+/, ''), edgar: null
      };
    }
  });

  // ── ASSEMBLE OUTPUT ────────────────────────────────────────────────
  const output = {
    meta: {
      generated:        nowISO(),
      generated_date:   todayISO(),
      script_version:   SCRIPT_VERSION,
      runtime_ms:       Date.now() - startTime,
      sources: [
        'NOAA Global Monitoring Laboratory (CO₂) — gml.noaa.gov',
        'NOAA NCEI Global Temperature Anomaly — ncei.noaa.gov',
        'NSIDC Sea Ice Index G02135 v3.0 — nsidc.org',
        'NASA EONET v3 (Wildfire Events) — eonet.gsfc.nasa.gov',
        'Open-Meteo ERA5 Reanalysis (Soil Moisture) — open-meteo.com',
        'GBIF Occurrence API — api.gbif.org',
        'SEC EDGAR Public API (Corporate Filings) — data.sec.gov'
      ],
      live_indicators: Object.fromEntries(
        Object.entries(liveIndicators).map(([k, v]) => [k, !!v])
      )
    },
    vyrion_index: vyrionIndex,
    atmosphere: {
      co2: liveIndicators.co2
        ? {
            ppm:       liveIndicators.co2.ppm,
            date:      liveIndicators.co2.date,
            score_A1:  liveIndicators.co2.score,
            source:    'NOAA Global Monitoring Laboratory — Mauna Loa Observatory',
            url:       'https://gml.noaa.gov/ccgg/trends/',
            retrieved: nowISO()
          }
        : (prev?.atmosphere?.co2 || null),
      global_temp_anomaly: liveIndicators.tempAnomaly
        ? {
            anomaly_c:  liveIndicators.tempAnomaly.anomaly_c,
            period:     liveIndicators.tempAnomaly.period,
            baseline:   liveIndicators.tempAnomaly.baseline,
            score_O1:   liveIndicators.tempAnomaly.score,
            source:     'NOAA NCEI Global Temperature',
            url:        'https://www.ncei.noaa.gov/cag/global/time-series/',
            retrieved:  nowISO()
          }
        : (prev?.atmosphere?.global_temp_anomaly || null)
    },
    cryosphere: {
      arctic: liveIndicators.arctic
        ? { ...liveIndicators.arctic, source: 'NSIDC Sea Ice Index G02135 v3.0', retrieved: nowISO() }
        : (prev?.cryosphere?.arctic || null),
      antarctic: liveIndicators.antarctic
        ? { ...liveIndicators.antarctic, source: 'NSIDC Sea Ice Index G02135 v3.0', retrieved: nowISO() }
        : (prev?.cryosphere?.antarctic || null)
    },
    forest: {
      wildfire: liveIndicators.wildfire
        ? { ...liveIndicators.wildfire, retrieved: nowISO() }
        : (prev?.forest?.wildfire || null)
    },
    freshwater: {
      soil_moisture: liveIndicators.soilMoisture
        ? { ...liveIndicators.soilMoisture, retrieved: nowISO() }
        : (prev?.freshwater?.soil_moisture || null)
    },
    biodiversity: {
      gbif: gbifData
        ? { ...gbifData, retrieved: nowISO() }
        : (prev?.biodiversity?.gbif || null)
    },
    companies
  };

  // ── WRITE OUTPUT ───────────────────────────────────────────────────
  const json = JSON.stringify(output, null, 2);
  writeFileSync(OUTPUT_PATH, json, 'utf8');

  const elapsed = Date.now() - startTime;
  log('════════════════════════════════════════════════════');
  log(`  COMPLETE — ${elapsed}ms`);
  log(`  Output: ${OUTPUT_PATH} (${(json.length / 1024).toFixed(1)} KB)`);
  log(`  VYRION Index: ${vyrionIndex.score} ± 1.8 / 100 · Day ${vyrionIndex.dayNumber}`);
  log(`  Live indicators: ${Object.values(liveIndicators).filter(Boolean).length} / 6`);
  log('════════════════════════════════════════════════════\n');
}

main().catch(e => {
  console.error('\n[VYRION FATAL]', e);
  process.exit(1);
});
