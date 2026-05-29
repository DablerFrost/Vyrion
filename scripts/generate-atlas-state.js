// ════════════════════════════════════════════════════════════════════════
// VYRION · ATLAS · Planetary Systems Mapping
// File: scripts/generate-atlas-state.js
//
// Aggregates live planetary data from public APIs into a unified snapshot.
//
// Sources:
//   • NOAA Climate (keyless public tier)
//   • NOAA OISST — Ocean heat
//   • NSIDC — Cryosphere / sea ice
//   • NASA EONET — Natural hazard events
//   • USGS Earthquake Hazards — Seismic activity
//   • Open-Meteo ERA5 — Atmospheric reanalysis
//
// Output:
//   data/atlas-state.json
//
// Behavior:
//   • Each source fetches independently
//   • Failures are caught, logged, and skipped (resilient mode)
//   • Output always written as long as at least one source succeeds
// ════════════════════════════════════════════════════════════════════════

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.resolve(__dirname, "../data/atlas-state.json");

// ─── Utility ──────────────────────────────────────────────────────────────────

const TIMEOUT_MS = 15_000;

async function fetchJSON(url, label) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    throw new Error(`[${label}] ${err.message}`);
  } finally {
    clearTimeout(timer);
  }
}

async function safeResolve(label, fn) {
  try {
    const data = await fn();
    console.log(`  ✓ ${label}`);
    return { ok: true, data };
  } catch (err) {
    console.warn(`  ✗ ${label} — skipped: ${err.message}`);
    return { ok: false, error: err.message };
  }
}

// ─── Sources ──────────────────────────────────────────────────────────────────

// USGS — Significant earthquakes in the past 30 days
async function fetchSeismic() {
  const url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
  const raw = await fetchJSON(url, "USGS Seismic");

  const features = raw.features ?? [];
  const events = features.map((f) => ({
    id: f.id,
    magnitude: f.properties.mag,
    place: f.properties.place,
    time: new Date(f.properties.time).toISOString(),
    coordinates: f.geometry?.coordinates ?? null,
    tsunami: f.properties.tsunami === 1,
    significance: f.properties.sig,
  }));

  return {
    count: events.length,
    maxMagnitude: events.reduce((m, e) => Math.max(m, e.magnitude ?? 0), 0),
    events: events.slice(0, 20), // cap at 20 for snapshot size
  };
}

// NASA EONET — Active natural hazard events
async function fetchHazards() {
  const url =
    "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50&days=30";
  const raw = await fetchJSON(url, "NASA EONET");

  const events = (raw.events ?? []).map((e) => ({
    id: e.id,
    title: e.title,
    categories: e.categories?.map((c) => c.title) ?? [],
    sources: e.sources?.map((s) => s.id) ?? [],
    geometry: e.geometry?.slice(-1)[0] ?? null, // most recent geometry
  }));

  const byCategory = events.reduce((acc, e) => {
    for (const cat of e.categories) {
      acc[cat] = (acc[cat] ?? 0) + 1;
    }
    return acc;
  }, {});

  return {
    totalActive: events.length,
    byCategory,
    events: events.slice(0, 30),
  };
}

// Open-Meteo ERA5 — Global atmospheric reanalysis (sample grid points)
// Uses a representative set of lat/lon points for global coverage
async function fetchAtmospheric() {
  // Sample 6 globally distributed reference points
  const points = [
    { name: "Arctic", lat: 80, lon: 0 },
    { name: "North Atlantic", lat: 50, lon: -30 },
    { name: "Tropics West", lat: 5, lon: -60 },
    { name: "Tropics East", lat: 5, lon: 100 },
    { name: "Southern Ocean", lat: -55, lon: 0 },
    { name: "Antarctic", lat: -80, lon: 0 },
  ];

  const results = await Promise.all(
    points.map(async (p) => {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${p.lat}&longitude=${p.lon}` +
        `&current=temperature_2m,surface_pressure,wind_speed_10m,relative_humidity_2m` +
        `&wind_speed_unit=ms`;

      try {
        const raw = await fetchJSON(url, `Open-Meteo ${p.name}`);
        return {
          name: p.name,
          lat: p.lat,
          lon: p.lon,
          temperature_2m: raw.current?.temperature_2m ?? null,
          surface_pressure: raw.current?.surface_pressure ?? null,
          wind_speed_10m: raw.current?.wind_speed_10m ?? null,
          relative_humidity_2m: raw.current?.relative_humidity_2m ?? null,
        };
      } catch {
        return { name: p.name, lat: p.lat, lon: p.lon, error: "fetch_failed" };
      }
    })
  );

  return { referencePoints: results };
}

// NOAA CDO — Climate anomaly data (keyless public token)
// NOTE: NOAA CDO requires a free API token for higher rate limits.
// Set NOAA_API_TOKEN as a GitHub secret to unlock full access.
// Without it, this falls back to a limited public endpoint.
async function fetchClimate() {
  const token = process.env.NOAA_API_TOKEN ?? null;

  if (token) {
    // Full CDO API access
    const url =
      "https://www.ncdc.noaa.gov/cdo-web/api/v2/data" +
      "?datasetid=GHCND&datatypeid=TAVG&stationid=GHCND:USW00094728" +
      "&startdate=" + getDateOffset(-7) +
      "&enddate=" + getDateOffset(0) +
      "&limit=10&units=metric";

    const raw = await fetchJSON(url, "NOAA CDO");
    return {
      source: "NOAA CDO (authenticated)",
      results: raw.results ?? [],
    };
  } else {
    // Keyless fallback: NOAA Global Surface Summary
    // Returns recent global temperature anomaly metadata
    const url =
      "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/data-info";
    const raw = await fetchJSON(url, "NOAA Climate (keyless)");
    return {
      source: "NOAA Climate (keyless fallback)",
      note: "Set NOAA_API_TOKEN secret for full CDO access",
      info: raw,
    };
  }
}

// NOAA Coral Reef Watch — Sea surface temperature anomaly (proxy for OISST)
async function fetchOceanHeat() {
  // CoRTAD / NOAA CRW daily global SST anomaly product
  // This endpoint returns current bleaching alert area metrics globally
  const url =
    "https://coralreefwatch.noaa.gov/product/5km/current/data/noaa_crw_bleaching_alert_area_v3.1_current.json";

  const raw = await fetchJSON(url, "NOAA CRW Ocean Heat");

  return {
    source: "NOAA Coral Reef Watch (SST anomaly proxy)",
    data: raw,
  };
}

// NSIDC — Sea ice extent (via NSIDC public data index)
// Full NSIDC data requires FTP; we use their public JSON summary instead
async function fetchCryosphere() {
  // NSIDC Sea Ice Index — current conditions summary
  const url =
    "https://nsidc.org/api/seaice/extent/north/daily/data.json?format=json";

  const raw = await fetchJSON(url, "NSIDC Sea Ice");

  const entries = Array.isArray(raw) ? raw : (raw.data ?? []);
  const latest = entries[entries.length - 1] ?? null;

  return {
    source: "NSIDC Sea Ice Index",
    latestEntry: latest,
    recordCount: entries.length,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("VYRION ATLAS — Planetary Systems Mapping");
  console.log("─".repeat(50));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("Fetching planetary data sources...\n");

  const [seismic, hazards, atmospheric, climate, oceanHeat, cryosphere] =
    await Promise.all([
      safeResolve("USGS Seismic Density", fetchSeismic),
      safeResolve("NASA EONET Hazard Topology", fetchHazards),
      safeResolve("Open-Meteo ERA5 Atmospheric", fetchAtmospheric),
      safeResolve("NOAA Climate Anomalies", fetchClimate),
      safeResolve("NOAA OISST Ocean Heat", fetchOceanHeat),
      safeResolve("NSIDC Cryosphere Indicators", fetchCryosphere),
    ]);

  const successCount = [
    seismic,
    hazards,
    atmospheric,
    climate,
    oceanHeat,
    cryosphere,
  ].filter((r) => r.ok).length;

  console.log(`\nSources resolved: ${successCount}/6`);

  if (successCount === 0) {
    console.error("ERROR: All data sources failed. Aborting.");
    process.exit(1);
  }

  const atlasState = {
    meta: {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      sourcesResolved: successCount,
      sourcesTotal: 6,
    },
    layers: {
      seismic: seismic.ok ? seismic.data : { error: seismic.error },
      hazards: hazards.ok ? hazards.data : { error: hazards.error },
      atmospheric: atmospheric.ok
        ? atmospheric.data
        : { error: atmospheric.error },
      climate: climate.ok ? climate.data : { error: climate.error },
      oceanHeat: oceanHeat.ok ? oceanHeat.data : { error: oceanHeat.error },
      cryosphere: cryosphere.ok
        ? cryosphere.data
        : { error: cryosphere.error },
    },
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(atlasState, null, 2), "utf8");

  console.log(`\nATLAS state written → ${OUTPUT_PATH}`);
  console.log("VYRION ATLAS mapping complete.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
