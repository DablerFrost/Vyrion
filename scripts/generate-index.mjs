#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════════
// VYRION · INDEX · Monthly Computation Pipeline (v1.1)
// File: scripts/generate-index.mjs
//
// Recomputes the VYRION Index from the indicator definitions in
// data/index-baseline.json (the published baseline artifact) plus live
// Tier A source data, per docs/VYRION-METHODOLOGY-V1.0.md:
//
//   S_final = Σ(W_i × S_i)          (system weights locked at v1.0)
//   Indicator (general form):
//     S = max(0, min(100, 100 × (1 − |value − baseline| / threshold)))
//     where `threshold` is the deviation from baseline at which the
//     score reaches 0. Direct/ascending indicators are encoded with
//     baseline = target and threshold = target (see Phase 1 draft).
//   A1 carries the methodology's SPECIFIED function instead:
//     S_A1 = max(0, min(100, 100 − ((CO₂ − 280) / (450 − 280)) × 100))
//     For A1 the `threshold` field holds the absolute ceiling (450),
//     not a deviation.
//   System score = mean of scored indicators (nulls excluded, the
//   scored count is always disclosed).
//   Uncertainty = RSS over systems: σ = √(Σ(W_i² × σ_i,eff²)).
//
// Missing-data protocol (methodology Part V), as implemented here:
//   1. A Tier A indicator whose live refresh fails keeps its last
//      confirmed value and score (carried, flagged FETCH_FAILED).
//   2. If that carried value is older than its cadence hold window
//      (daily 7d — the methodology's figure — weekly 14d, monthly 62d,
//      annual 400d), the indicator is flagged DATA_GAP and its system's
//      σ is widened: σ_eff = σ × 1.25^(gaps in system). The methodology
//      mandates widening without fixing a factor; 25% per gap is the
//      v1.1 implementation choice, disclosed here and in the output.
//   3. Tier B/C indicators are held at last confirmed value between
//      source publications BY DESIGN (methodology cadence note) — they
//      are disclosed carries, never silent refreshes, and never gaps.
//   4. Indicators with no defensible value (score null in the baseline)
//      stay excluded from their system mean. Nothing is invented.
//
// MODES:
//   Default (proposal): writes data/index-proposal.json — a PROPOSAL
//     for human approval. Publishes nothing.
//   --publish: additionally writes data/index-current.json and appends
//     to data/index-history.json. Run only after human approval of the
//     proposal (publication remains a human merge — see
//     .github/workflows/index-monthly.yml).
//
// OPTIONS:
//   --baseline <path>   Indicator definitions file
//                       (default: data/index-baseline.json)
//   --out-dir <path>    Output directory (default: data/)
//
// Sources: all public-domain or open-license. No API keys.
// Open Proof Protocol: contact@vyrion.earth · corrections in CHANGELOG.md
// ════════════════════════════════════════════════════════════════════════

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(REPO_ROOT, "data");

const GENERATOR_VERSION = "1.1.0";
const TIMEOUT_MS = 20_000;

// ─── CLI ──────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const PUBLISH = argv.includes("--publish");
function argVal(flag) {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : null;
}
const BASELINE_PATH =
  argVal("--baseline") ?? path.join(DATA_DIR, "index-baseline.json");
const OUT_DIR = argVal("--out-dir") ?? DATA_DIR;
const CONSCIENCE_PATH = path.join(DATA_DIR, "conscience-data.json");

// ─── Helpers (pattern: generate-atlas-state.js / fetch-conscience-data.mjs) ──

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const todayISO = () => new Date().toISOString().slice(0, 10);
const nowISO = () => new Date().toISOString();
const monthISO = (y, m) =>
  `${y}-${String(m).padStart(2, "0")}`;

async function fetchText(url, label) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "VYRION-INDEX-DataBot/1.1 (contact@vyrion.earth)",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.text();
  } catch (err) {
    throw new Error(`[${label}] ${err.message}`);
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJSON(url, label) {
  return JSON.parse(await fetchText(url, label));
}

async function safeResolve(label, fn) {
  const t0 = Date.now();
  try {
    const data = await fn();
    console.log(`  ✓ ${label}`);
    return { ok: true, data, ms: Date.now() - t0 };
  } catch (err) {
    console.warn(`  ✗ ${label} — skipped: ${err.message}`);
    return { ok: false, error: err.message, ms: Date.now() - t0 };
  }
}

// Reference date for staleness: a value "as of" a month is fresh through
// the END of that month; a bare year through the end of that year.
function asofDate(value_asof) {
  if (!value_asof) return null;
  const s = String(value_asof);
  if (/^\d{4}-\d{2}-\d{2}/.test(s))
    return new Date(`${s.slice(0, 10)}T00:00:00Z`);
  if (/^\d{4}-\d{2}$/.test(s)) {
    const [y, m] = s.split("-").map(Number);
    return new Date(Date.UTC(y, m, 0)); // last day of month m
  }
  if (/^\d{4}$/.test(s)) return new Date(Date.UTC(Number(s), 11, 31));
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function ageDays(value_asof, ref = new Date()) {
  const d = asofDate(value_asof);
  if (!d) return null;
  return Math.floor((ref.getTime() - d.getTime()) / 86_400_000);
}

// Cadence hold windows in days (missing-data protocol, see header).
const CADENCE_HOLD_DAYS = { daily: 7, weekly: 14, monthly: 62, annual: 400 };
const SIGMA_WIDEN_PER_GAP = 1.25; // σ_eff = σ × 1.25^(gaps in system)

// ─── Scoring ──────────────────────────────────────────────────────────────────

// General form. `threshold` = deviation from baseline at score 0.
function scoreGeneral(value, baseline, threshold) {
  if (value == null || baseline == null || threshold == null) return null;
  if (threshold === 0) return null;
  return clamp(
    100 * (1 - Math.abs(value - baseline) / Math.abs(threshold)),
    0,
    100
  );
}

// A1's specified function (methodology, System 1). Here `threshold`
// holds the ABSOLUTE ceiling (450 ppm), not a deviation.
function scoreA1Specified(value, baseline, ceiling) {
  if (value == null || baseline == null || ceiling == null) return null;
  if (ceiling === baseline) return null;
  return clamp(100 - ((value - baseline) / (ceiling - baseline)) * 100, 0, 100);
}

function scoreIndicator(ind, value) {
  if (ind.function === "A1_CO2_SPECIFIED" || ind.id === "A1") {
    return scoreA1Specified(value, ind.baseline, ind.threshold);
  }
  return scoreGeneral(value, ind.baseline, ind.threshold);
}

// ─── Tier A fetchers — NOAA GML greenhouse gases (public domain) ─────────────
// Monthly-mean text files. Columns: year, month, decimal, average, ...
// The average is field index 3 in all three products.

function parseGMLMonthly(txt) {
  const rows = [];
  for (const line of txt.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const p = t.split(/\s+/);
    if (p.length < 4) continue;
    const year = parseInt(p[0], 10);
    const month = parseInt(p[1], 10);
    const avg = parseFloat(p[3]);
    if (!Number.isFinite(year) || !Number.isFinite(month)) continue;
    if (!Number.isFinite(avg) || avg <= 0) continue; // skip -999 style fills
    rows.push({ year, month, avg });
  }
  if (rows.length === 0) throw new Error("no valid data rows");
  return rows[rows.length - 1];
}

async function fetchA1_CO2() {
  const url =
    "https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.txt";
  const last = parseGMLMonthly(await fetchText(url, "NOAA GML CO2"));
  return {
    value: r2(last.avg),
    value_asof: monthISO(last.year, last.month),
    detail: { product: "co2_mm_mlo.txt (monthly mean, Mauna Loa)", url },
  };
}

async function fetchA3_CH4() {
  const url =
    "https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_mm_gl.txt";
  const last = parseGMLMonthly(await fetchText(url, "NOAA GML CH4"));
  return {
    value: r2(last.avg),
    value_asof: monthISO(last.year, last.month),
    detail: { product: "ch4_mm_gl.txt (global monthly mean)", url },
  };
}

async function fetchA4_N2O() {
  const url =
    "https://gml.noaa.gov/webdata/ccgg/trends/n2o/n2o_mm_gl.txt";
  const last = parseGMLMonthly(await fetchText(url, "NOAA GML N2O"));
  return {
    value: r2(last.avg),
    value_asof: monthISO(last.year, last.month),
    detail: { product: "n2o_mm_gl.txt (global monthly mean)", url },
  };
}

// ─── Tier A fetcher — A2 NASA GISS GISTEMP (public domain) ───────────────────
// GLB.Ts+dSST.csv anomalies are relative to 1951–1980. Per the Phase 1
// draft method, convert to the methodology's 1850–1900 baseline using
// the file's own 1880–1900 mean (the earliest complete window in the
// record): value_vs_1850-1900 = anomaly − mean(1880–1900 anomalies).

async function fetchA2_GISS() {
  const url =
    "https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv";
  const txt = await fetchText(url, "NASA GISS GISTEMP");
  const lines = txt.split("\n");
  const headerIdx = lines.findIndex((l) => l.startsWith("Year,"));
  if (headerIdx < 0) throw new Error("GISS header row not found");
  const rows = [];
  for (const line of lines.slice(headerIdx + 1)) {
    const p = line.split(",").map((s) => s.trim());
    const year = parseInt(p[0], 10);
    if (!Number.isFinite(year)) continue;
    const months = p.slice(1, 13).map((v) =>
      v === "***" || v === "" ? null : parseFloat(v)
    );
    const jd = p[13] === "***" || p[13] === "" ? null : parseFloat(p[13]);
    rows.push({ year, months, jd });
  }
  const annual = (row) =>
    row.jd ??
    (row.months.filter((v) => v != null).length
      ? row.months.reduce((a, b) => a + (b ?? 0), 0) /
        row.months.filter((v) => v != null).length
      : null);
  const baseRows = rows.filter((r) => r.year >= 1880 && r.year <= 1900);
  const baseVals = baseRows.map(annual).filter((v) => v != null);
  if (baseVals.length < 15)
    throw new Error("GISS 1880–1900 baseline window incomplete");
  const offset = baseVals.reduce((a, b) => a + b, 0) / baseVals.length;

  // Most recent available monthly anomaly, scanning backwards.
  let latest = null;
  for (let i = rows.length - 1; i >= 0 && !latest; i--) {
    for (let m = 11; m >= 0; m--) {
      if (rows[i].months[m] != null) {
        latest = { year: rows[i].year, month: m + 1, anomaly: rows[i].months[m] };
        break;
      }
    }
  }
  if (!latest) throw new Error("GISS has no monthly values");
  return {
    value: r2(latest.anomaly - offset),
    value_asof: monthISO(latest.year, latest.month),
    detail: {
      product: "GLB.Ts+dSST.csv (Land-Ocean, global means)",
      giss_anomaly_vs_1951_1980: latest.anomaly,
      offset_1880_1900: Math.round(offset * 10000) / 10000,
      conversion: "value = GISS anomaly − mean(1880–1900) of the same file",
      url,
    },
  };
}

// ─── Tier A fetchers — C1/C2 NSIDC Sea Ice Index G02135 (public domain) ──────
// Monthly extent files: {N|S}_{MM}_extent_v3.0.csv under
// {north|south}/monthly/data/. Columns: year, mo, extent, missing, src.
// C1 is anchored to the March maximum and C2 to the February minimum
// (methodology as written); September (north) and the current month are
// retrieved as disclosed context for the v1.1 framing discussion.

const NSIDC_BASE =
  process.env.VYRION_NSIDC_BASE ??
  "https://sidads.colorado.edu/DATASETS/NOAA/G02135";

// sidads is intermittently unreachable (observed repeatedly, Oct 2026:
// multi-second stalls and dropped connections between successful
// responses), so NSIDC reads retry with backoff. If all attempts fail,
// the caller's missing-data protocol handles it — the indicator carries
// forward flagged FETCH_FAILED rather than crashing the run. (The old
// noaadata.apps.nsidc.org mirror no longer serves the G02135 monthly or
// daily paths — verified 404 — so it is not used.)
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchSeaIceMonth(hemi, month) {
  const prefix = hemi === "north" ? "N" : "S";
  const file = `${prefix}_${String(month).padStart(2, "0")}_extent_v3.0.csv`;
  const url = `${NSIDC_BASE}/${hemi}/monthly/data/${file}`;
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const txt = await fetchText(url, `NSIDC ${file}`);
      let best = null;
      for (const line of txt.split("\n")) {
        const p = line.split(",").map((s) => s.trim());
        const year = parseInt(p[0], 10);
        const extent = parseFloat(p[2]);
        if (!Number.isFinite(year) || year < 1900) continue;
        if (!Number.isFinite(extent) || extent <= 0 || extent > 50) continue;
        if (!best || year > best.year) best = { year, extent };
      }
      if (!best) throw new Error(`no valid rows in ${file}`);
      return { ...best, via: url, attempts: attempt };
    } catch (err) {
      lastError = err;
      if (attempt < 3) await sleep(2000 * attempt);
    }
  }
  throw lastError ?? new Error(`NSIDC ${file} unreachable`);
}

async function fetchC1_Arctic() {
  const currentMonth = new Date().getUTCMonth() + 1;
  const [march, sept, current] = await Promise.all([
    fetchSeaIceMonth("north", 3),
    fetchSeaIceMonth("north", 9).catch(() => null),
    fetchSeaIceMonth("north", currentMonth).catch(() => null),
  ]);
  return {
    value: r2(march.extent),
    value_asof: monthISO(march.year, 3),
    detail: {
      anchor: "March annual maximum (methodology as written)",
      september_min_latest: sept
        ? { value: r2(sept.extent), asof: monthISO(sept.year, 9) }
        : null,
      current_month_latest: current
        ? {
            value: r2(current.extent),
            asof: monthISO(current.year, currentMonth),
          }
        : null,
      via: march.via,
    },
  };
}

async function fetchC2_Antarctic() {
  const currentMonth = new Date().getUTCMonth() + 1;
  const [feb, current] = await Promise.all([
    fetchSeaIceMonth("south", 2),
    fetchSeaIceMonth("south", currentMonth).catch(() => null),
  ]);
  return {
    value: r2(feb.extent),
    value_asof: monthISO(feb.year, 2),
    detail: {
      anchor: "February annual minimum (methodology as written)",
      current_month_latest: current
        ? {
            value: r2(current.extent),
            asof: monthISO(current.year, currentMonth),
          }
        : null,
      via: feb.via,
    },
  };
}

// ─── Tier A fetcher — F3 NASA EONET wildfires (public domain) ────────────────

async function fetchF3_EONET() {
  const url =
    "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&categories=wildfires&limit=500";
  const raw = await fetchJSON(url, "NASA EONET wildfires");
  const events = raw.events ?? [];
  return {
    value: events.length,
    value_asof: todayISO(),
    detail: {
      window: "all currently open wildfire events (no day limit)",
      sample_titles: events.slice(0, 3).map((e) => e.title),
      url,
    },
  };
}

// ─── Tier A stub — B5 GBIF (CC BY 4.0) ───────────────────────────────────────
// ⚠ STUB — B5 ("GBIF occurrence record density anomaly") is NOT scored.
// The Phase 1 reconstruction found the indicator ill-defined as written:
// GBIF publishes raw occurrence counts, which grow with digitization and
// observer effort; no "density anomaly vs historical species density"
// product exists, and scoring raw growth would reward data collection,
// not biodiversity. The v1.1 substitution (IUCN Red List Index) is
// pending Tyler's approval. Until then this fetcher retrieves the raw
// count for PROVENANCE ONLY — it never produces a score and never
// enters the Biodiversity system mean.

async function fetchB5_GBIF_stub() {
  const url = "https://api.gbif.org/v1/occurrence/count";
  const txt = await fetchText(url, "GBIF occurrence count (stub)");
  const count = parseInt(txt.trim(), 10);
  if (!Number.isFinite(count)) throw new Error("GBIF count not an integer");
  return { raw_count: count, scored: false, url };
}

// ─── Tier A derivation — Corporate Accountability from CONSCIENCE ────────────
// Derives CA1–CA6 inputs from data/conscience-data.json exactly as the
// Phase 1 reconstruction did, from the portfolio it finds there:
//   CA1  CDP mean — grades on the A=100 … D=0 ladder (step 100/6)
//   CA2  SBTi approval rate — % with status "Approved 1.5°C"
//   CA3  Sabin total — Σ sabin_center.active_cases (scored downstream
//        against baseline 0 / threshold 200 from the baseline file)
//   CA4  InfluenceMap mean — F=0 … A+=100 on a 13-rung ladder (step 100/12)
//   CA5  NOT derivable — the dataset stores CIK URLs only; no 8-K
//        density was ever recorded. Stays excluded (null), as in the
//        reconstruction. A live EDGAR density fetcher is follow-up work.
//   CA6  TPI-based (the reconstruction's v1.1 differentiation from CA2):
//        % of portfolio at TPI Level 4/5 or 5/5.

const CDP_LADDER = {
  A: 100, "A-": 83.33, "B+": 75, B: 66.67, "B-": 50,
  "C+": 41.67, C: 33.33, "C-": 16.67, "D+": 8.33, D: 0,
};
const IM_LADDER = {
  F: 0, "D-": 8.33, D: 16.67, "D+": 25, "C-": 33.33, C: 41.67,
  "C+": 50, "B-": 58.33, B: 66.67, "B+": 75, "A-": 83.33, A: 91.67,
  "A+": 100,
};

function ladderMean(companies, pick, ladder, label) {
  const vals = [];
  for (const c of companies) {
    const g = pick(c);
    if (g == null) continue;
    if (!(g in ladder)) throw new Error(`${label}: unmapped grade "${g}"`);
    vals.push(ladder[g]);
  }
  if (vals.length === 0) throw new Error(`${label}: no graded companies`);
  return r2(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function deriveCA(conscience) {
  const companies = Array.isArray(conscience.companies)
    ? conscience.companies
    : Object.values(conscience.companies ?? {});
  if (companies.length === 0)
    throw new Error("conscience-data.json has no companies");
  const n = companies.length;
  const asof =
    conscience.meta?.generated_date ??
    (conscience.meta?.generated
      ? String(conscience.meta.generated).slice(0, 10)
      : todayISO());

  const approved = companies.filter((c) =>
    String(c.sbti?.status ?? "").startsWith("Approved 1.5")
  ).length;
  const tpiHigh = companies.filter((c) => {
    const m = String(c.tpi?.level ?? "").match(/Level\s+(\d+)/);
    return m && parseInt(m[1], 10) >= 4;
  }).length;
  const sabinTotal = companies.reduce(
    (a, c) => a + (Number(c.sabin_center?.active_cases) || 0),
    0
  );

  const detail = { portfolio_companies: n, dataset_generated: asof };
  return {
    CA1: {
      value: ladderMean(companies, (c) => c.cdp?.grade, CDP_LADDER, "CA1/CDP"),
      value_asof: asof,
      detail: { ...detail, mapping: "CDP grades A=100 … D=0 (step 100/6)" },
    },
    CA2: {
      value: r2((approved / n) * 100),
      value_asof: asof,
      detail: { ...detail, approved_1p5c: approved },
    },
    CA3: {
      value: sabinTotal,
      value_asof: asof,
      detail: { ...detail, source_field: "sabin_center.active_cases (sum)" },
    },
    CA4: {
      value: ladderMean(
        companies,
        (c) => c.influencemap?.grade,
        IM_LADDER,
        "CA4/InfluenceMap"
      ),
      value_asof: asof,
      detail: {
        ...detail,
        mapping: "InfluenceMap grades F=0 … A+=100 (13 rungs, step 100/12)",
      },
    },
    CA5: null, // not derivable — see header note above
    CA6: {
      value: r2((tpiHigh / n) * 100),
      value_asof: asof,
      detail: {
        ...detail,
        tpi_level_4_or_5: tpiHigh,
        definition: "% of portfolio at TPI Level 4/5 or 5/5",
      },
    },
  };
}

// ─── Fetcher registry ────────────────────────────────────────────────────────

const FETCHERS = {
  A1: fetchA1_CO2,
  A2: fetchA2_GISS,
  A3: fetchA3_CH4,
  A4: fetchA4_N2O,
  C1: fetchC1_Arctic,
  C2: fetchC2_Antarctic,
  F3: fetchF3_EONET,
};

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("VYRION INDEX — Monthly Computation Pipeline (v1.1)");
  console.log("─".repeat(56));
  console.log(`Timestamp: ${nowISO()}`);
  console.log(`Mode: ${PUBLISH ? "PUBLISH" : "PROPOSAL (nothing is published)"}`);
  console.log(`Baseline definitions: ${BASELINE_PATH}\n`);

  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(
      `ERROR: baseline definitions not found at ${BASELINE_PATH}.\n` +
        "data/index-baseline.json is produced by the Phase 1 baseline step."
    );
    process.exit(1);
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  if (!Array.isArray(baseline.systems)) {
    console.error("ERROR: baseline file has no systems array.");
    process.exit(1);
  }

  // CONSCIENCE dataset (for the CA derivation) — optional; CA indicators
  // fall back to carried values with flags if it cannot be loaded.
  let conscience = null;
  try {
    conscience = JSON.parse(fs.readFileSync(CONSCIENCE_PATH, "utf8"));
    console.log(`CONSCIENCE dataset loaded: ${CONSCIENCE_PATH}`);
  } catch (err) {
    console.warn(
      `  ✗ CONSCIENCE dataset unavailable (${err.message}) — CA indicators will carry forward`
    );
  }

  // Run all Tier A fetchers + the CA derivation in parallel.
  console.log("\nFetching Tier A sources...");
  const fetcherIds = Object.keys(FETCHERS);
  const results = await Promise.all([
    ...fetcherIds.map((id) => safeResolve(id, FETCHERS[id])),
    safeResolve("B5 (stub)", fetchB5_GBIF_stub),
    safeResolve(
      "CA derivation",
      async () => {
        if (!conscience) throw new Error("no CONSCIENCE dataset");
        return deriveCA(conscience);
      }
    ),
  ]);
  const fetched = {};
  fetcherIds.forEach((id, i) => {
    fetched[id] = results[i];
  });
  const b5Result = results[fetcherIds.length];
  const caResult = results[fetcherIds.length + 1];
  const caDerived = caResult.ok ? caResult.data : {};

  const fetcherReport = {};
  fetcherIds.forEach((id) => {
    fetcherReport[id] = fetched[id].ok
      ? { ok: true, ms: fetched[id].ms }
      : { ok: false, error: fetched[id].error, ms: fetched[id].ms };
  });
  fetcherReport.B5 = b5Result.ok
    ? { ok: true, stub: true, raw_count: b5Result.data.raw_count }
    : { ok: false, stub: true, error: b5Result.error };
  fetcherReport.CA = caResult.ok
    ? { ok: true, ms: caResult.ms }
    : { ok: false, error: caResult.error, ms: caResult.ms };

  // ── Build the computed state ──────────────────────────────────────────────
  const globalFlags = [];
  const outSystems = [];
  let weightCoverage = 0;
  let totalScored = 0;
  let totalIndicators = 0;
  let rssSum = 0;

  for (const sys of baseline.systems) {
    const outIndicators = [];
    let gaps = 0;

    for (const ind of sys.indicators ?? []) {
      totalIndicators++;
      const out = {
        ...ind,
        status: "carried",
        flags: [],
        provenance: {
          method: "carried",
          note:
            "Held at last confirmed value (Tier B/C disclosed hold, or Tier A fallback).",
        },
      };

      const refresh =
        ind.id === "B5"
          ? "stub"
          : /^CA\d+$/.test(ind.id)
            ? "ca"
            : ind.tier === "A" && FETCHERS[ind.id]
              ? "fetch"
              : null;

      if (refresh === "stub") {
        out.status = "stubbed_not_scored";
        out.flags.push("SUBSTITUTION_PENDING");
        out.provenance = {
          method: "stub",
          note:
            "v1.1 substitutes the IUCN Red List Index for B5 (pending approval). Raw GBIF count is provenance only — never scored.",
          raw_input: b5Result.ok
            ? { gbif_occurrence_count: b5Result.data.raw_count, url: b5Result.data.url }
            : { error: b5Result.error },
        };
      } else if (refresh === "ca") {
        const derived = caDerived[ind.id];
        if (derived) {
          out.value = derived.value;
          out.value_asof = derived.value_asof;
          out.score = r2(scoreIndicator(ind, derived.value));
          out.status = "derived";
          out.provenance = {
            method: "derived",
            source: "data/conscience-data.json",
            detail: derived.detail,
          };
        } else {
          // CA5, or derivation failed for this indicator.
          out.flags.push(
            ind.id === "CA5" ? "NOT_DERIVABLE_FROM_DATASET" : "DERIVATION_FAILED"
          );
          if (ind.score == null) out.status = "excluded";
        }
      } else if (refresh === "fetch") {
        const res = fetched[ind.id];
        if (res.ok) {
          out.value = res.data.value;
          out.value_asof = res.data.value_asof;
          out.score = r2(scoreIndicator(ind, res.data.value));
          out.status = "fetched";
          out.provenance = {
            method: "live_fetch",
            fetched_at: nowISO(),
            detail: res.data.detail,
          };
        } else {
          out.status = "carried_fetch_failed";
          out.flags.push("FETCH_FAILED");
          out.provenance = {
            method: "carried",
            note: `Live fetch failed (${res.error}); last confirmed value held per missing-data protocol.`,
          };
        }
      }

      // Data-gap protocol: only pipeline-refreshed (Tier A) indicators
      // can gap — Tier B/C holds are by design, disclosed above.
      if (
        ind.tier === "A" &&
        (out.status === "carried_fetch_failed" ||
          out.flags.includes("DERIVATION_FAILED"))
      ) {
        const age = ageDays(out.value_asof);
        const hold =
          CADENCE_HOLD_DAYS[ind.cadence] ?? CADENCE_HOLD_DAYS.monthly;
        if (age != null && age > hold) {
          out.flags.push("DATA_GAP");
          gaps++;
        }
      }

      if (typeof out.score === "number") totalScored++;
      outIndicators.push(out);
    }

    const scored = outIndicators.filter((i) => typeof i.score === "number");
    const sysScore =
      scored.length > 0
        ? r2(scored.reduce((a, i) => a + i.score, 0) / scored.length)
        : null;
    const sigmaBase = typeof sys.sigma === "number" ? sys.sigma : null;
    const sigmaEff =
      sigmaBase == null ? null : r2(sigmaBase * Math.pow(SIGMA_WIDEN_PER_GAP, gaps));
    if (sysScore != null && typeof sys.weight === "number")
      weightCoverage += sys.weight;
    if (sysScore != null && sigmaEff != null && typeof sys.weight === "number")
      rssSum += Math.pow(sys.weight * sigmaEff, 2);

    outSystems.push({
      ...sys,
      score: sysScore,
      sigma: sigmaBase,
      sigma_effective: sigmaEff,
      data_gaps: gaps,
      scored_count: scored.length,
      indicator_count: outIndicators.length,
      indicators: outIndicators,
    });
  }

  const compositeRaw = outSystems.reduce(
    (a, s) => a + (s.score != null && typeof s.weight === "number" ? s.score * s.weight : 0),
    0
  );
  const composite = r1(compositeRaw);
  const uncertainty = r2(Math.sqrt(rssSum));
  if (Math.abs(weightCoverage - 1) > 0.001)
    globalFlags.push(
      `PARTIAL_WEIGHT_COVERAGE (${weightCoverage.toFixed(3)} of 1.0) — composite is a partial sum`
    );

  const output = {
    version: baseline.version ?? null,
    generator: {
      name: "generate-index.mjs",
      version: GENERATOR_VERSION,
      mode: PUBLISH ? "publish" : "proposal",
      ran_at: nowISO(),
    },
    status: PUBLISH ? "computed" : "proposal",
    as_of: todayISO(),
    based_on: {
      baseline_version: baseline.version ?? null,
      baseline_as_of: baseline.as_of ?? null,
      baseline_file: path.relative(REPO_ROOT, BASELINE_PATH),
    },
    composite: {
      score: composite,
      score_raw: r2(compositeRaw),
      uncertainty,
      uncertainty_method:
        "RSS over system sigma; sigma widened ×1.25 per data-gapped indicator in the system (missing-data protocol, v1.1 implementation choice)",
      weight_coverage: r2(weightCoverage * 100) / 100,
      scored_indicators: totalScored,
      total_indicators: totalIndicators,
      flags: globalFlags,
    },
    systems: outSystems,
    fetcher_report: fetcherReport,
  };

  // ── Write outputs ─────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const proposalPath = path.join(OUT_DIR, "index-proposal.json");
  fs.writeFileSync(proposalPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`\nProposal written → ${proposalPath}`);

  if (PUBLISH) {
    const currentPath = path.join(OUT_DIR, "index-current.json");
    fs.writeFileSync(currentPath, JSON.stringify(output, null, 2), "utf8");
    console.log(`Current written → ${currentPath}`);

    const historyPath = path.join(OUT_DIR, "index-history.json");
    let history = [];
    if (fs.existsSync(historyPath)) {
      try {
        history = JSON.parse(fs.readFileSync(historyPath, "utf8"));
        if (!Array.isArray(history)) history = [];
      } catch {
        history = [];
      }
    }
    const entry = {
      as_of: output.as_of,
      published_at: nowISO(),
      score: composite,
      uncertainty,
      based_on_baseline: baseline.version ?? null,
      systems: Object.fromEntries(
        outSystems.map((s) => [s.id, s.score])
      ),
    };
    const existing = history.findIndex((h) => h.as_of === entry.as_of);
    if (existing >= 0) history[existing] = entry; // same-day republication
    else history.push(entry);
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), "utf8");
    console.log(`History updated → ${historyPath} (${history.length} entries)`);
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log("\n── VYRION INDEX (PROPOSAL) ─────────────────────────");
  for (const s of outSystems) {
    console.log(
      `  ${s.name.padEnd(26)} (${Math.round((s.weight ?? 0) * 100)}%): ` +
        `${s.score ?? "—"}  ·  ${s.scored_count}/${s.indicator_count} scored` +
        (s.data_gaps ? `  ·  ⚠ ${s.data_gaps} DATA GAP(S)` : "")
    );
  }
  console.log("  " + "─".repeat(52));
  console.log(
    `  Composite: ${composite} ± ${uncertainty} / 100  ·  ${totalScored}/${totalIndicators} indicators scored`
  );
  if (globalFlags.length) console.log(`  Flags: ${globalFlags.join("; ")}`);
  console.log(
    PUBLISH
      ? "  Published to index-current.json + index-history.json."
      : "  PROPOSAL ONLY — nothing published. Review, then rerun with --publish."
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
