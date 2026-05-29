// ════════════════════════════════════════════════════════════════════════
// VYRION · ROOT · Infrastructure Integrity Monitor
// File: scripts/generate-root-status.js
//
// Validates operational integrity of the VYRION platform.
//
// Checks:
//   • Dataset freshness (age of each data file)
//   • Schema validity (required fields present)
//   • Repository snapshot availability
//   • Runtime consistency
//   • System health score
//
// Output:
//   data/root-status.json
// ════════════════════════════════════════════════════════════════════════

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.resolve(REPO_ROOT, "data/root-status.json");

// Maximum age in hours before a dataset is considered stale
const STALENESS_THRESHOLD_HOURS = 26;

// ─── Utility ──────────────────────────────────────────────────────────────────

function now() {
  return new Date();
}

function hoursSince(date) {
  return (now() - new Date(date)) / (1000 * 60 * 60);
}

function fileAgeHours(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return hoursSince(stat.mtime);
  } catch {
    return null;
  }
}

function loadJSON(relativePath) {
  const fullPath = path.resolve(REPO_ROOT, relativePath);
  try {
    if (!fs.existsSync(fullPath)) return { ok: false, error: "file_not_found" };
    const raw = fs.readFileSync(fullPath, "utf8");
    if (!raw.trim()) return { ok: false, error: "file_empty" };
    const data = JSON.parse(raw);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ─── Checks ───────────────────────────────────────────────────────────────────

function checkDataset(relativePath, label, requiredFields = []) {
  const fullPath = path.resolve(REPO_ROOT, relativePath);
  const result = {
    label,
    path: relativePath,
    exists: false,
    empty: false,
    ageHours: null,
    stale: false,
    schemaValid: true,
    missingFields: [],
    status: "unknown",
  };

  if (!fs.existsSync(fullPath)) {
    result.status = "missing";
    return result;
  }

  result.exists = true;
  result.ageHours = Math.round(fileAgeHours(fullPath) * 10) / 10;
  result.stale = result.ageHours > STALENESS_THRESHOLD_HOURS;

  const loaded = loadJSON(relativePath);
  if (!loaded.ok) {
    result.empty = true;
    result.status = "invalid";
    return result;
  }

  // Schema check — verify required top-level fields
  for (const field of requiredFields) {
    if (!(field in loaded.data)) {
      result.missingFields.push(field);
      result.schemaValid = false;
    }
  }

  if (result.stale) {
    result.status = "stale";
  } else if (!result.schemaValid) {
    result.status = "schema_error";
  } else {
    result.status = "ok";
  }

  return result;
}

function checkRuntime() {
  const nodeVersion = process.version;
  const major = parseInt(nodeVersion.replace("v", "").split(".")[0], 10);

  return {
    nodeVersion,
    nodeMajor: major,
    nodeSupported: major >= 18,
    platform: process.platform,
    arch: process.arch,
    status: major >= 18 ? "ok" : "unsupported",
  };
}

function checkWorkflowFiles() {
  const workflows = [
    "conscience-daily.yml",
    "shield-update.yml",
    "atlas-refresh.yml",
    "root-system.yml",
    "canopy-render.yml",
  ];

  const results = workflows.map((wf) => {
    const fullPath = path.resolve(REPO_ROOT, ".github/workflows", wf);
    const exists = fs.existsSync(fullPath);
    return {
      workflow: wf,
      exists,
      status: exists ? "ok" : "missing",
    };
  });

  return results;
}

function checkScripts() {
  const scripts = [
    "fetch-conscience-data.js",
    "fetch-shield-data.js",
    "generate-atlas-state.js",
    "generate-root-status.js",
    "generate-canopy-state.js",
  ];

  const results = scripts.map((s) => {
    const fullPath = path.resolve(REPO_ROOT, "scripts", s);
    const exists = fs.existsSync(fullPath);
    return {
      script: s,
      exists,
      status: exists ? "ok" : "missing",
    };
  });

  return results;
}

function computeHealthScore(datasets, runtime, workflows, scripts) {
  let score = 100;
  const issues = [];

  // Dataset checks (60 points total, 15 per dataset)
  for (const ds of datasets) {
    if (ds.status === "missing") {
      score -= 15;
      issues.push(`Dataset missing: ${ds.path}`);
    } else if (ds.status === "stale") {
      score -= 8;
      issues.push(`Dataset stale (${ds.ageHours}h): ${ds.path}`);
    } else if (ds.status === "schema_error") {
      score -= 5;
      issues.push(`Schema error in: ${ds.path}`);
    } else if (ds.status === "invalid") {
      score -= 15;
      issues.push(`Dataset invalid: ${ds.path}`);
    }
  }

  // Runtime check (10 points)
  if (runtime.status !== "ok") {
    score -= 10;
    issues.push(`Runtime issue: Node ${runtime.nodeVersion}`);
  }

  // Workflow files (15 points)
  const missingWorkflows = workflows.filter((w) => !w.exists);
  if (missingWorkflows.length > 0) {
    score -= missingWorkflows.length * 3;
    missingWorkflows.forEach((w) => issues.push(`Workflow missing: ${w.workflow}`));
  }

  // Scripts (15 points)
  const missingScripts = scripts.filter((s) => !s.exists);
  if (missingScripts.length > 0) {
    score -= missingScripts.length * 3;
    missingScripts.forEach((s) => issues.push(`Script missing: ${s.script}`));
  }

  score = Math.max(0, score);

  let grade;
  if (score >= 90) grade = "excellent";
  else if (score >= 75) grade = "good";
  else if (score >= 50) grade = "degraded";
  else grade = "critical";

  return { score, grade, issues };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("VYRION ROOT — Infrastructure Integrity Monitor");
  console.log("─".repeat(50));
  console.log(`Timestamp: ${now().toISOString()}`);
  console.log("Running integrity checks...\n");

  // ── Dataset freshness + schema checks ──
  console.log("Datasets:");
  const datasets = [
    checkDataset("data/conscience-data.json", "CONSCIENCE", ["generatedAt"]),
    checkDataset("data/shield-snapshot.json", "SHIELD", ["generatedAt"]),
    checkDataset("data/atlas-state.json", "ATLAS", ["meta", "layers"]),
  ];
  datasets.forEach((d) =>
    console.log(`  ${d.status === "ok" ? "✓" : "✗"} ${d.label} — ${d.status} (age: ${d.ageHours}h)`)
  );

  // ── Runtime ──
  console.log("\nRuntime:");
  const runtime = checkRuntime();
  console.log(`  ${runtime.status === "ok" ? "✓" : "✗"} Node.js ${runtime.nodeVersion} — ${runtime.status}`);

  // ── Workflow files ──
  console.log("\nWorkflows:");
  const workflows = checkWorkflowFiles();
  workflows.forEach((w) =>
    console.log(`  ${w.status === "ok" ? "✓" : "✗"} ${w.workflow} — ${w.status}`)
  );

  // ── Scripts ──
  console.log("\nScripts:");
  const scripts = checkScripts();
  scripts.forEach((s) =>
    console.log(`  ${s.status === "ok" ? "✓" : "✗"} ${s.script} — ${s.status}`)
  );

  // ── Health score ──
  const health = computeHealthScore(datasets, runtime, workflows, scripts);
  console.log(`\nHealth Score: ${health.score}/100 (${health.grade})`);
  if (health.issues.length > 0) {
    console.log("Issues:");
    health.issues.forEach((i) => console.log(`  • ${i}`));
  }

  // ── Write output ──
  const rootStatus = {
    meta: {
      version: "1.0.0",
      generatedAt: now().toISOString(),
    },
    health: {
      score: health.score,
      grade: health.grade,
      issues: health.issues,
    },
    checks: {
      datasets,
      runtime,
      workflows,
      scripts,
    },
  };

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(rootStatus, null, 2), "utf8");

  console.log(`\nROOT status written → ${OUTPUT_PATH}`);
  console.log("VYRION ROOT integrity verification complete.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
