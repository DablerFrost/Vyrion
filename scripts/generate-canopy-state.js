// ════════════════════════════════════════════════════════════════════════
// VYRION · CANOPY · Visualization Synthesis
// File: scripts/generate-canopy-state.js
//
// Aggregates upstream VYRION intelligence layers into a unified
// visualization-ready synthesis snapshot.
//
// Upstream Inputs:
//   • conscience-data.json      — CONSCIENCE state
//   • data/shield-snapshot.json — SHIELD hazards
//   • data/atlas-state.json     — ATLAS planetary topology
//   • data/root-status.json     — ROOT integrity metrics (optional)
//
// Output:
//   data/canopy-state.json
//
// Behavior:
//   • Each layer is loaded independently
//   • Missing or malformed layers are skipped (resilient mode)
//   • Output is always written as long as at least one layer loads
// ════════════════════════════════════════════════════════════════════════

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.resolve(REPO_ROOT, "data/canopy-state.json");

// ─── Utility ──────────────────────────────────────────────────────────────────

function loadLayer(relativePath, label) {
  const fullPath = path.resolve(REPO_ROOT, relativePath);
  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`  ✗ ${label} — skipped: file not found (${relativePath})`);
      return { ok: false, error: "file_not_found" };
    }

    const raw = fs.readFileSync(fullPath, "utf8");

    if (!raw.trim()) {
      console.warn(`  ✗ ${label} — skipped: file is empty`);
      return { ok: false, error: "file_empty" };
    }

    const data = JSON.parse(raw);
    console.log(`  ✓ ${label}`);
    return { ok: true, data };
  } catch (err) {
    console.warn(`  ✗ ${label} — skipped: ${err.message}`);
    return { ok: false, error: err.message };
  }
}

// ─── Synthesis ────────────────────────────────────────────────────────────────

function synthesizeHazardSummary(shield, atlas) {
  const summary = { totalEvents: 0, categories: {}, seismicCount: 0, maxMagnitude: 0 };

  if (atlas.ok) {
    const seismic = atlas.data?.layers?.seismic;
    if (seismic) {
      summary.seismicCount = seismic.count ?? 0;
      summary.maxMagnitude = seismic.maxMagnitude ?? 0;
      summary.totalEvents += summary.seismicCount;
    }

    const hazards = atlas.data?.layers?.hazards;
    if (hazards?.byCategory) {
      for (const [cat, count] of Object.entries(hazards.byCategory)) {
        summary.categories[cat] = (summary.categories[cat] ?? 0) + count;
        summary.totalEvents += count;
      }
    }
  }

  if (shield.ok && shield.data) {
    // Merge SHIELD hazard counts if present
    const shieldEvents = shield.data?.events ?? shield.data?.hazards ?? [];
    summary.totalEvents += Array.isArray(shieldEvents) ? shieldEvents.length : 0;
  }

  return summary;
}

function synthesizeAtmosphericSummary(atlas) {
  if (!atlas.ok) return null;

  const points = atlas.data?.layers?.atmospheric?.referencePoints ?? [];
  if (!points.length) return null;

  const temps = points
    .map((p) => p.temperature_2m)
    .filter((t) => t != null && typeof t === "number");

  return {
    referencePointCount: points.length,
    avgTemperature_2m: temps.length
      ? Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 100) / 100
      : null,
    minTemperature_2m: temps.length ? Math.min(...temps) : null,
    maxTemperature_2m: temps.length ? Math.max(...temps) : null,
  };
}

function synthesizePlanetaryHealth(conscience, root) {
  const health = {
    conscienceAvailable: conscience.ok,
    rootAvailable: root.ok,
    indicators: {},
  };

  if (conscience.ok && conscience.data) {
    // Surface top-level conscience metrics if present
    const d = conscience.data;
    if (d.status) health.indicators.conscienceStatus = d.status;
    if (d.score != null) health.indicators.conscienceScore = d.score;
    if (d.generatedAt) health.indicators.conscienceTimestamp = d.generatedAt;
  }

  if (root.ok && root.data) {
    const d = root.data;
    if (d.status) health.indicators.rootStatus = d.status;
    if (d.integrity != null) health.indicators.rootIntegrity = d.integrity;
    if (d.generatedAt) health.indicators.rootTimestamp = d.generatedAt;
  }

  return health;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("VYRION CANOPY — Visualization Synthesis");
  console.log("─".repeat(50));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("Loading upstream intelligence layers...\n");

  const conscience = loadLayer("conscience-data.json", "CONSCIENCE State");
  const shield = loadLayer("data/shield-snapshot.json", "SHIELD Hazards");
  const atlas = loadLayer("data/atlas-state.json", "ATLAS Planetary Topology");
  const root = loadLayer("data/root-status.json", "ROOT Integrity Metrics");

  const layers = [conscience, shield, atlas, root];
  const successCount = layers.filter((l) => l.ok).length;

  console.log(`\nLayers loaded: ${successCount}/4`);

  if (successCount === 0) {
    console.error("ERROR: No upstream layers available. Aborting.");
    process.exit(1);
  }

  // ─── Synthesize ─────────────────────────────────────────────────────────────

  const canopyState = {
    meta: {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      layersLoaded: successCount,
      layersTotal: 4,
      layerStatus: {
        conscience: conscience.ok ? "ok" : conscience.error,
        shield: shield.ok ? "ok" : shield.error,
        atlas: atlas.ok ? "ok" : atlas.error,
        root: root.ok ? "ok" : root.error,
      },
    },

    // ── Visualization-ready synthesis layers ──
    synthesis: {
      hazardSummary: synthesizeHazardSummary(shield, atlas),
      atmosphericSummary: synthesizeAtmosphericSummary(atlas),
      planetaryHealth: synthesizePlanetaryHealth(conscience, root),
    },

    // ── Raw upstream snapshots (pass-through for dashboard consumers) ──
    upstream: {
      conscience: conscience.ok ? conscience.data : { error: conscience.error },
      shield: shield.ok ? shield.data : { error: shield.error },
      atlas: atlas.ok ? atlas.data : { error: atlas.error },
      root: root.ok ? root.data : { error: root.error },
    },
  };

  // ─── Write Output ───────────────────────────────────────────────────────────

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(canopyState, null, 2), "utf8");

  console.log(`\nCANOPY state written → ${OUTPUT_PATH}`);
  console.log("VYRION CANOPY synthesis complete.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
