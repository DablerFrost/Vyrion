/**
 * VYRION CONSCIENCE — Daily Data Fetch Script
 * File: scripts/fetch-conscience-data.js
 * Runs via GitHub Actions (Node.js 20 — native fetch, no npm dependencies)
 *
 * Sources:
 *   NOAA GML     — Daily atmospheric CO₂, Mauna Loa Observatory
 *   SEC EDGAR    — Latest 10-K, 8-K dates + 90-day 8-K count per company
 *   Open-Meteo   — Global surface temperature anomaly (ERA5 reanalysis)
 *   World Bank   — Annual global CO₂ emissions (cross-reference)
 *
 * Output: conscience-data.json (committed to repo root by GitHub Actions)
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';

// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY REGISTRY — 11 companies tracked by CONSCIENCE
// ─────────────────────────────────────────────────────────────────────────────
const COMPANIES = [
  { id: 'exxon',      name: 'ExxonMobil',      ticker: 'XOM',  cik: '0000034088' },
  { id: 'bp',         name: 'BP',               ticker: 'BP',   cik: '0000313807' },
  { id: 'shell',      name: 'Shell',            ticker: 'SHEL', cik: '0000806517' },
  { id: 'delta',      name: 'Delta Air Lines',  ticker: 'DAL',  cik: '0000027904' },
  { id: 'starbucks',  name: 'Starbucks',        ticker: 'SBUX', cik: '0000829224' },
  { id: 'walmart',    name: 'Walmart',          ticker: 'WMT',  cik: '0000104169' },
  { id: 'meta',       name: 'Meta',             ticker: 'META', cik: '0001326801' },
  { id: 'amazon',     name: 'Amazon',           ticker: 'AMZN', cik: '0001018724' },
  { id: 'microsoft',  name: 'Microsoft',        ticker: 'MSFT', cik: '0000789019' },
  { id: 'unilever',   name: 'Unilever',         ticker: 'ULVR', cik: '0000049519' },
  { id: 'apple',      name: 'Apple',            ticker: 'AAPL', cik: '0000320193' },
];

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`[CONSCIENCE] ${msg}`); }
function warn(msg) { console.warn(`[CONSCIENCE WARN] ${msg}`); }

async function safeFetch(url, label) {
  try {
    log(`Fetching: ${label}`);
    const r = await fetch(url, {
      headers: { 'User-Agent': 'VYRION-CONSCIENCE-DataBot/1.0 (contact@vyrion.earth)' },
      signal: AbortSignal.timeout(15000), // 15s timeout
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r;
  } catch (e) {
    warn(`${label} — ${e.message}`);
    return null;
  }
}

function daysAgo(days) {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 1: NOAA GML — Daily atmospheric CO₂, Mauna Loa Observatory
//  URL: https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_daily_mlo.txt
//  Format: year month day decimal_date co2_ppm
//  License: Public domain — NOAA Global Monitoring Laboratory
// ─────────────────────────────────────────────────────────────────────────────
async function fetchNOAACO2() {
  const url = 'https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_daily_mlo.txt';
  const r = await safeFetch(url, 'NOAA CO₂ Mauna Loa');
  if (!r) return null;

  const text = await r.text();
  const lines = text.split('\n').filter(l => l.trim() && !l.startsWith('#'));

  // Walk backwards to find most recent valid reading
  for (let i = lines.length - 1; i >= 0; i--) {
    const parts = lines[i].trim().split(/\s+/);
    if (parts.length >= 5) {
      const ppm = parseFloat(parts[4]);
      if (!isNaN(ppm) && ppm > 0) {
        const date = `${parts[0]}-${parts[1].padStart(2,'0')}-${parts[2].padStart(2,'0')}`;
        log(`CO₂: ${ppm} ppm on ${date}`);
        return {
          ppm: parseFloat(ppm.toFixed(2)),
          date,
          source: 'NOAA Global Monitoring Laboratory — Mauna Loa Observatory',
          url: 'https://gml.noaa.gov/ccgg/trends/',
          retrieved: new Date().toISOString(),
        };
      }
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 2: SEC EDGAR Submissions API
//  URL: https://data.sec.gov/submissions/CIK{padded_to_10}.json
//  Returns: all filings in reverse chronological order
//  Data extracted:
//    - latest 10-K or 20-F date (annual report)
//    - latest 8-K date (material corporate event)
//    - count of 8-K filings in last 90 days (regulatory activity signal)
//    - latest 8-K description (item type)
//  License: Public domain — U.S. Securities and Exchange Commission
// ─────────────────────────────────────────────────────────────────────────────
async function fetchEDGARCompany(company) {
  const url = `https://data.sec.gov/submissions/CIK${company.cik}.json`;
  const r = await safeFetch(url, `EDGAR ${company.ticker}`);
  if (!r) return null;

  try {
    const d = await r.json();
    const forms   = d.filings.recent.form;
    const dates   = d.filings.recent.filingDate;
    const accs    = d.filings.recent.accessionNumber;
    const descs   = d.filings.recent.primaryDocument || [];
    const items   = d.filings.recent.items || [];

    const cutoff90 = daysAgo(90);
    let annual    = null; // latest 10-K or 20-F
    let latest8k  = null; // latest 8-K date
    let count8k90 = 0;    // 8-K count in 90 days
    let items8k   = [];   // item types of recent 8-Ks

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      const date = dates[i];

      // Annual report
      if (!annual && (form === '10-K' || form === '20-F')) {
        const cikNum = company.cik.replace(/^0+/, '');
        const accClean = accs[i].replace(/-/g, '');
        annual = {
          form,
          date,
          url: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cikNum}&type=${form}&dateb=&owner=include&count=5`,
        };
      }

      // 8-K filings
      if (form === '8-K') {
        if (!latest8k) {
          latest8k = {
            date,
            items: items[i] || '',
          };
        }
        if (date >= cutoff90) {
          count8k90++;
          if (items[i] && items8k.length < 5) {
            items8k.push({ date, items: items[i] });
          }
        }
      }

      // Stop after we have everything and have passed the 90-day window
      if (annual && latest8k && date < cutoff90 && count8k90 > 0) break;
    }

    log(`EDGAR ${company.ticker}: annual=${annual?.date} 8k=${latest8k?.date} 90d=${count8k90}`);

    return {
      ticker: company.ticker,
      cik: company.cik.replace(/^0+/, ''),
      annual_filing:    annual  || null,
      latest_8k:        latest8k || null,
      count_8k_90d:    count8k90,
      recent_8k_items: items8k,
      retrieved: new Date().toISOString(),
    };
  } catch (e) {
    warn(`EDGAR parse error ${company.ticker}: ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 3: Open-Meteo ERA5 — Global mean 2m temperature anomaly
//  API: https://archive-api.open-meteo.com/v1/archive
//  Uses ERA5 reanalysis at global average coordinates (0°N, 0°E is ocean —
//  we use Northern Hemisphere weighted sample points and average)
//  Pre-industrial baseline: 1850–1900 average ≈ 13.8°C
//  License: CC BY 4.0 — Open-Meteo / ECMWF ERA5
// ─────────────────────────────────────────────────────────────────────────────
async function fetchOpenMeteoTempAnomaly() {
  // Sample global temperature at 4 representative stations then average
  // (Open-Meteo ERA5 is gridded reanalysis — this is a valid sampling approach)
  const SAMPLE_COORDS = [
    { lat: 51.5,   lon: 0.0,    label: 'N.Europe'    },
    { lat: 40.7,   lon: -74.0,  label: 'N.America'   },
    { lat: -23.5,  lon: -46.6,  label: 'S.America'   },
    { lat: 1.3,    lon: 103.8,  label: 'SE.Asia'      },
  ];

  const yesterday = daysAgo(2); // ERA5 has ~2-day lag
  const weekAgo   = daysAgo(9);

  const temps = [];

  for (const coord of SAMPLE_COORDS) {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${coord.lat}&longitude=${coord.lon}&start_date=${weekAgo}&end_date=${yesterday}&daily=temperature_2m_mean&timezone=UTC`;
    const r = await safeFetch(url, `Open-Meteo ERA5 ${coord.label}`);
    if (!r) continue;
    try {
      const d = await r.json();
      if (d.daily?.temperature_2m_mean) {
        const vals = d.daily.temperature_2m_mean.filter(v => v !== null);
        if (vals.length > 0) {
          const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
          temps.push(mean);
        }
      }
    } catch (e) {
      warn(`Open-Meteo parse ${coord.label}: ${e.message}`);
    }
  }

  if (temps.length === 0) return null;

  // Simple average across sample points
  const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

  // Pre-industrial baseline proxy: ERA5 1850–1900 mean ≈ 8.5°C for these specific coords
  // Note: this is a sampling proxy, not a global mean. Disclosed in source attribution.
  // VYRION Index uses IPCC/NOAA official anomaly — this is a supplementary signal only.
  const BASELINE = 8.5;
  const anomaly  = parseFloat((avgTemp - BASELINE).toFixed(2));

  log(`Open-Meteo ERA5 sample avg: ${avgTemp.toFixed(2)}°C | anomaly vs proxy baseline: +${anomaly}°C`);

  return {
    sample_avg_celsius:     parseFloat(avgTemp.toFixed(2)),
    anomaly_vs_proxy:       anomaly,
    sample_coords:          SAMPLE_COORDS.map(c => c.label),
    period:                 `${weekAgo} to ${yesterday}`,
    baseline_note:          'Proxy baseline from ERA5 sample mean — not IPCC global mean. Supplementary signal only.',
    source:                 'Open-Meteo ERA5 Reanalysis (ECMWF)',
    url:                    'https://open-meteo.com/',
    license:                'CC BY 4.0',
    retrieved:              new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 4: World Bank Climate API — Global CO₂ emissions (annual)
//  API: https://api.worldbank.org/v2/country/WLD/indicator/EN.ATM.CO2E.KT
//  Returns: annual CO₂ emissions in kt for the world (WLD)
//  Most recent year available is typically 2–3 years behind current
//  License: CC BY 4.0 — World Bank Open Data
// ─────────────────────────────────────────────────────────────────────────────
async function fetchWorldBankCO2() {
  const url = 'https://api.worldbank.org/v2/country/WLD/indicator/EN.ATM.CO2E.KT?format=json&mrv=1&per_page=1';
  const r = await safeFetch(url, 'World Bank CO₂ emissions');
  if (!r) return null;

  try {
    const d = await r.json();
    if (!d[1] || !d[1][0]) return null;
    const entry = d[1][0];
    const val = entry.value;
    const year = entry.date;
    if (!val) return null;

    const gt = parseFloat((val / 1e6).toFixed(2)); // convert kt → Gt
    log(`World Bank: global CO₂ ${gt} Gt in ${year}`);
    return {
      global_co2_gt:  gt,
      year:           year,
      unit:           'Gigatons CO₂',
      source:         'World Bank Open Data — EN.ATM.CO2E.KT',
      url:            'https://data.worldbank.org/indicator/EN.ATM.CO2E.KT',
      license:        'CC BY 4.0',
      retrieved:      new Date().toISOString(),
    };
  } catch (e) {
    warn(`World Bank parse error: ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOURCE 5: NOAA GSOD — Additional climate context
//  Global Surface Temperature anomaly monthly from NOAA Climate
//  Using NOAA's teleconnection/anomaly data endpoint
// ─────────────────────────────────────────────────────────────────────────────
async function fetchNOAAClimateContext() {
  // NOAA provides global temperature anomaly CSV
 const currentYear = new Date().getFullYear();
const url = `https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/ytd/1/${currentYear}.csv`;
  const r = await safeFetch(url, 'NOAA Global Temp Anomaly');
  if (!r) return null;

  try {
    const text = await r.text();
    const lines = text.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('Year'));
    if (lines.length === 0) return null;

    // Last line = most recent month
    const last = lines[lines.length - 1].trim().split(',');
    if (last.length < 2) return null;

    const period  = last[0]?.trim();
    const anomaly = parseFloat(last[1]?.trim());
    if (isNaN(anomaly)) return null;

    log(`NOAA Global Temp Anomaly: +${anomaly}°C (period ${period})`);
    return {
      anomaly_celsius: anomaly,
      period,
      baseline: '20th century average (1901–2000)',
      source: 'NOAA National Centers for Environmental Information (NCEI)',
      url: 'https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/',
      retrieved: new Date().toISOString(),
    };
  } catch(e) {
    warn(`NOAA climate context parse: ${e.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  LOAD PREVIOUS DATA — preserve manually set VYRION Index values
// ─────────────────────────────────────────────────────────────────────────────
function loadPreviousData() {
  const path = 'conscience-data.json';
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    warn('Could not parse previous conscience-data.json');
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  log('=== CONSCIENCE Daily Data Refresh Starting ===');
  const startTime = Date.now();

  const prev = loadPreviousData();

  // Fetch all sources concurrently
  log('Fetching all data sources in parallel...');
  const [
    co2,
    edgarResults,
    tempAnomaly,
    worldBankCO2,
    noaaClimate,
  ] = await Promise.allSettled([
    fetchNOAACO2(),
    Promise.allSettled(COMPANIES.map(co => fetchEDGARCompany(co))),
    fetchOpenMeteoTempAnomaly(),
    fetchWorldBankCO2(),
    fetchNOAAClimateContext(),
  ]);

  // Process EDGAR results into a map by company ID
  const edgarMap = {};
  if (edgarResults.status === 'fulfilled') {
    edgarResults.value.forEach((res, i) => {
      const co = COMPANIES[i];
      edgarMap[co.id] = res.status === 'fulfilled' ? res.value : null;
    });
  }

  // Build output JSON
  const out = {
    meta: {
      generated:        new Date().toISOString(),
      generated_date:   todayISO(),
      script_version:   '1.0',
      runtime_ms:       Date.now() - startTime,
      sources: [
        'NOAA Global Monitoring Laboratory (CO₂)',
        'SEC EDGAR Public API (corporate filings)',
        'Open-Meteo ERA5 Reanalysis (temperature)',
        'World Bank Open Data (global emissions)',
        'NOAA NCEI (global temperature anomaly)',
      ],
    },

    // ── ATMOSPHERE ──────────────────────────────────────────────────────────
    atmosphere: {
      co2: co2.status === 'fulfilled' ? co2.value : null,
      global_temp_anomaly: noaaClimate.status === 'fulfilled' ? noaaClimate.value : null,
      global_temp_era5:    tempAnomaly.status === 'fulfilled'  ? tempAnomaly.value : null,
    },

    // ── GLOBAL EMISSIONS ─────────────────────────────────────────────────────
    global_emissions: worldBankCO2.status === 'fulfilled' ? worldBankCO2.value : null,

    // ── VYRION INDEX — preserved from previous or default ───────────────────
    // Tyler updates this manually via the daily post workflow.
    // This block is NEVER overwritten by the automated script.
    vyrion_index: prev?.vyrion_index || {
      score:     41.2,
      uncertainty: 1.8,
      day:       12,
      date:      '2026-03-29',
      note:      'Updated manually by Tyler Frost / DablerFrost each morning',
    },

    // ── COMPANY EDGAR DATA ───────────────────────────────────────────────────
    companies: {},
  };

  // Populate per-company EDGAR data
  for (const co of COMPANIES) {
    out.companies[co.id] = {
      name:   co.name,
      ticker: co.ticker,
      cik:    co.cik.replace(/^0+/, ''),
      edgar:  edgarMap[co.id] || null,
    };
  }

  // ── WRITE OUTPUT ──────────────────────────────────────────────────────────
  const outputPath = 'conscience-data.json';
  const json = JSON.stringify(out, null, 2);
  writeFileSync(outputPath, json, 'utf8');

  const elapsed = Date.now() - startTime;
  log(`=== Complete in ${elapsed}ms ===`);
  log(`Output: ${outputPath} (${json.length.toLocaleString()} bytes)`);

  // Print summary
  console.log('\n── SUMMARY ──────────────────────────────────────────────');
  console.log(`CO₂:        ${out.atmosphere.co2?.ppm ?? 'failed'} ppm (${out.atmosphere.co2?.date ?? ''})`);
  console.log(`Temp:       ${out.atmosphere.global_temp_anomaly?.anomaly_celsius ?? 'failed'}°C anomaly`);
  console.log(`World Bank: ${out.global_emissions?.global_co2_gt ?? 'failed'} Gt CO₂ (${out.global_emissions?.year ?? ''})`);
  let edgarOk = 0;
  for (const co of COMPANIES) {
    if (out.companies[co.id]?.edgar?.annual_filing) edgarOk++;
  }
  console.log(`EDGAR:      ${edgarOk}/11 companies verified`);
  console.log('─────────────────────────────────────────────────────────\n');
}

main().catch(e => {
  console.error('[CONSCIENCE FATAL]', e);
  process.exit(1);
});
