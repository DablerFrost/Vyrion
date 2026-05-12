/**
 * ══════════════════════════════════════════════════════════════════
 *  VYRION Schema Validator — v2.0
 *  File: scripts/validate-schema.js
 *
 *  Validates conscience-data.json against the v2.0 output schema
 *  produced by scripts/fetch-conscience-data.js v2.0
 *
 *  USAGE:
 *    node scripts/validate-schema.js
 *
 *  EXITS:
 *    0 — validation passed (clean or warnings only)
 *    1 — validation failed (one or more errors)
 *
 *  WIRE INTO GITHUB ACTIONS:
 *    Add a step before the commit step in conscience-daily.yml:
 *      - name: VYRION · Validate conscience-data.json schema
 *        run: node scripts/validate-schema.js
 *    This blocks bad pushes automatically.
 *
 *  OPEN PROOF PROTOCOL:
 *    Errors reported to contact@vyrion.earth
 *    Corrections published within 24 hours · CHANGELOG.md
 *
 *  VYRION PBC · Tyler Frost / DablerFrost · Hilo, Hawaii
 *  github.com/DablerFrost/Vyrion · contact@vyrion.earth
 * ══════════════════════════════════════════════════════════════════
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─────────────────────────────────────────────────────────────────────────────
//  PATH RESOLUTION — ESM compatible
// ─────────────────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const JSON_PATH  = join(__dirname, '..', 'conscience-data.json');

// ─────────────────────────────────────────────────────────────────────────────
//  GROUND TRUTH — v2.0 schema constants
//  Update these when scores, counts, or structure changes.
//  These are the single checkpoint that catches drift.
// ─────────────────────────────────────────────────────────────────────────────
const TRUTH = {
  scriptVersion:       '2.0',
  uncertainty:         1.8,
  minDetectableChange: 0.5,
  scoreRange:          { min: 0, max: 100 },

  // VYRION Index — expected fields in vyrion_index block
  indexRequiredFields: [
    'score', 'uncertainty', 'dayNumber', 'date',
    'computed', 'methodology', 'formula', 'components',
    'indicator_scores', 'indicator_status'
  ],

  // Eight system component keys — must all be present
  systemComponents: [
    'atmosphere', 'ocean', 'ice', 'forest',
    'biodiversity', 'freshwater', 'soil', 'corporate'
  ],

  // System weight totals must sum to 1.0
  systemWeights: {
    atmosphere:   0.22,
    ocean:        0.18,
    ice:          0.14,
    forest:       0.13,
    biodiversity: 0.12,
    freshwater:   0.10,
    soil:         0.07,
    corporate:    0.04
  },

  // Top-level blocks required in output
  requiredTopFields: [
    'meta', 'vyrion_index', 'atmosphere', 'cryosphere',
    'forest', 'freshwater', 'biodiversity', 'companies'
  ],

  // Meta block required fields
  metaRequiredFields: [
    'generated', 'generated_date', 'script_version',
    'runtime_ms', 'sources', 'live_indicators'
  ],

  // Live indicator keys expected in meta.live_indicators
  liveIndicatorKeys: [
    'co2', 'tempAnomaly', 'arctic', 'antarctic',
    'wildfire', 'soilMoisture'
  ],

  // Required company IDs — all 11
  requiredCompanyIds: [
    'exxon', 'bp', 'shell', 'delta', 'starbucks',
    'walmart', 'meta', 'amazon', 'microsoft', 'unilever', 'apple'
  ],

  // Required fields per company entry
  companyRequiredFields: ['name', 'ticker', 'cik'],

  // EDGAR fields expected when edgar is not null
  edgarRequiredFields: [
    'ticker', 'cik', 'annual_filing',
    'count_8k_90d', 'recent_8k_items', 'retrieved'
  ],

  // Stale threshold — warn if vyrion_index.dayNumber is stale
  // Day count should match dynamic computation within ±1
  staleDayThreshold: 7,

  // CO₂ sanity range (ppm) — alert if outside expected atmospheric range
  co2SanityRange: { min: 400, max: 450 },

  // Score sanity range — alert if computed index outside expected zone
  scoreSanityRange: { min: 20, max: 80 }
};

// ─────────────────────────────────────────────────────────────────────────────
//  COLLECTORS
// ─────────────────────────────────────────────────────────────────────────────
const errors   = [];
const warnings = [];
const passes   = [];

function fail(msg)  { errors.push(msg); }
function warn(msg)  { warnings.push(msg); }
function pass(msg)  { passes.push(msg); }

function check(condition, passMsg, failMsg) {
  if (condition) { pass(passMsg); } else { fail(failMsg); }
}

// ─────────────────────────────────────────────────────────────────────────────
//  LOAD FILE
// ─────────────────────────────────────────────────────────────────────────────
if (!existsSync(JSON_PATH)) {
  console.error('\n\x1b[31m[VYRION Validator] FATAL: conscience-data.json not found at repo root.\x1b[0m');
  console.error(`Expected path: ${JSON_PATH}\n`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(readFileSync(JSON_PATH, 'utf8'));
} catch(e) {
  console.error('\n\x1b[31m[VYRION Validator] FATAL: conscience-data.json is not valid JSON.\x1b[0m');
  console.error(e.message + '\n');
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
//  VALIDATION CHECKS
// ─────────────────────────────────────────────────────────────────────────────

// ── CHECK 1: Top-level structure ──────────────────────────────────────────
TRUTH.requiredTopFields.forEach(f => {
  check(
    data[f] !== undefined,
    `Top-level field present: "${f}"`,
    `Missing top-level field: "${f}"`
  );
});

// ── CHECK 2: Meta block ───────────────────────────────────────────────────
if (data.meta) {
  TRUTH.metaRequiredFields.forEach(f => {
    check(
      data.meta[f] !== undefined,
      `meta.${f} present`,
      `Missing meta field: "${f}"`
    );
  });

  // Script version
  check(
    data.meta.script_version === TRUTH.scriptVersion,
    `Script version correct: ${TRUTH.scriptVersion}`,
    `Script version mismatch — got "${data.meta.script_version}", expected "${TRUTH.scriptVersion}"`
  );

  // Generated date is a valid ISO string
  check(
    typeof data.meta.generated === 'string' && !isNaN(Date.parse(data.meta.generated)),
    'meta.generated is a valid ISO timestamp',
    `meta.generated is not a valid ISO timestamp: "${data.meta.generated}"`
  );

  // Runtime sanity — warn if unusually slow (>60s) or suspiciously fast (<100ms)
  if (typeof data.meta.runtime_ms === 'number') {
    if (data.meta.runtime_ms > 60000) warn(`meta.runtime_ms unusually high: ${data.meta.runtime_ms}ms — possible timeout`);
    if (data.meta.runtime_ms < 100)   warn(`meta.runtime_ms suspiciously low: ${data.meta.runtime_ms}ms`);
    else pass(`meta.runtime_ms within normal range: ${data.meta.runtime_ms}ms`);
  }

  // Live indicator keys
  if (data.meta.live_indicators && typeof data.meta.live_indicators === 'object') {
    TRUTH.liveIndicatorKeys.forEach(k => {
      check(
        k in data.meta.live_indicators,
        `live_indicator key present: "${k}"`,
        `Missing live_indicator key: "${k}"`
      );
    });

    // Count live indicators — warn if none were live
    const liveCount = Object.values(data.meta.live_indicators).filter(Boolean).length;
    if (liveCount === 0) {
      warn('All live indicators failed — conscience-data.json contains only fallback values');
    } else {
      pass(`${liveCount} of ${TRUTH.liveIndicatorKeys.length} live indicators fetched successfully`);
    }
  }

  // Sources array
  check(
    Array.isArray(data.meta.sources) && data.meta.sources.length > 0,
    'meta.sources is a non-empty array',
    'meta.sources is missing or empty'
  );
} else {
  fail('meta block is entirely missing');
}

// ── CHECK 3: VYRION Index block ───────────────────────────────────────────
if (data.vyrion_index) {
  TRUTH.indexRequiredFields.forEach(f => {
    check(
      data.vyrion_index[f] !== undefined,
      `vyrion_index.${f} present`,
      `Missing vyrion_index field: "${f}"`
    );
  });

  // Score is a number in valid range
  const score = data.vyrion_index.score;
  check(
    typeof score === 'number' && !isNaN(score),
    'vyrion_index.score is a number',
    `vyrion_index.score is not a number: "${score}"`
  );

  if (typeof score === 'number') {
    check(
      score >= TRUTH.scoreRange.min && score <= TRUTH.scoreRange.max,
      `vyrion_index.score in valid range: ${score}`,
      `vyrion_index.score out of range [0–100]: ${score}`
    );

    // Warn if score outside expected planetary health zone
    if (score < TRUTH.scoreSanityRange.min || score > TRUTH.scoreSanityRange.max) {
      warn(`vyrion_index.score ${score} is outside expected range [${TRUTH.scoreSanityRange.min}–${TRUTH.scoreSanityRange.max}] — verify data sources`);
    }
  }

  // Uncertainty must be exactly 1.8
  check(
    data.vyrion_index.uncertainty === TRUTH.uncertainty,
    `vyrion_index.uncertainty correct: ${TRUTH.uncertainty}`,
    `vyrion_index.uncertainty must be ${TRUTH.uncertainty}, got: ${data.vyrion_index.uncertainty}`
  );

  // computed must be true
  check(
    data.vyrion_index.computed === true,
    'vyrion_index.computed is true — automated pipeline active',
    'vyrion_index.computed is not true — score may be manually set'
  );

  // dayNumber is a positive integer — check for staleness
  const dayNum = data.vyrion_index.dayNumber;
  check(
    typeof dayNum === 'number' && Number.isInteger(dayNum) && dayNum > 0,
    `vyrion_index.dayNumber is a valid positive integer: ${dayNum}`,
    `vyrion_index.dayNumber is not a valid positive integer: "${dayNum}"`
  );

  if (typeof dayNum === 'number') {
    // Compute expected day number from origin date
    const DAY_ONE = new Date('2026-03-18T00:00:00-10:00');
    const expectedDay = Math.max(1, Math.floor((Date.now() - DAY_ONE.getTime()) / 86400000) + 1);
    const dayDrift = Math.abs(dayNum - expectedDay);

    if (dayDrift > TRUTH.staleDayThreshold) {
      warn(`vyrion_index.dayNumber is ${dayNum} but expected ~${expectedDay} — drift of ${dayDrift} days detected`);
    } else {
      pass(`vyrion_index.dayNumber ${dayNum} is current (expected ~${expectedDay})`);
    }
  }

  // date field is a valid YYYY-MM-DD string
  check(
    typeof data.vyrion_index.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.vyrion_index.date),
    `vyrion_index.date is a valid date string: "${data.vyrion_index.date}"`,
    `vyrion_index.date is not a valid YYYY-MM-DD string: "${data.vyrion_index.date}"`
  );

  // Components block — all 8 systems present
  if (data.vyrion_index.components && typeof data.vyrion_index.components === 'object') {
    TRUTH.systemComponents.forEach(sys => {
      check(
        data.vyrion_index.components[sys] !== undefined,
        `vyrion_index.components.${sys} present`,
        `Missing system component: "${sys}"`
      );

      const comp = data.vyrion_index.components[sys];
      if (comp) {
        // Each component must have a score and weight
        check(
          typeof comp.score === 'number',
          `components.${sys}.score is a number: ${comp.score}`,
          `components.${sys}.score is not a number`
        );
        check(
          typeof comp.weight === 'number',
          `components.${sys}.weight is a number: ${comp.weight}`,
          `components.${sys}.weight is not a number`
        );

        // Verify weight matches methodology
        if (typeof comp.weight === 'number') {
          const expectedWeight = TRUTH.systemWeights[sys];
          if (Math.abs(comp.weight - expectedWeight) > 0.001) {
            fail(`components.${sys}.weight is ${comp.weight}, expected ${expectedWeight} per methodology`);
          }
        }

        // Score range check per system
        if (typeof comp.score === 'number') {
          if (comp.score < 0 || comp.score > 100) {
            fail(`components.${sys}.score ${comp.score} is outside [0–100]`);
          }
        }
      }
    });

    // Verify weights sum to 1.0
    const weightSum = TRUTH.systemComponents.reduce((sum, sys) => {
      return sum + (data.vyrion_index.components[sys]?.weight || 0);
    }, 0);
    if (Math.abs(weightSum - 1.0) > 0.001) {
      fail(`System weights sum to ${weightSum.toFixed(4)}, must equal 1.0`);
    } else {
      pass(`System weights sum to 1.0 ✓`);
    }

    // Verify S_final computation matches component scores × weights
    const computedScore = TRUTH.systemComponents.reduce((sum, sys) => {
      const comp = data.vyrion_index.components[sys];
      if (comp && typeof comp.score === 'number' && typeof comp.weight === 'number') {
        return sum + (comp.score * comp.weight);
      }
      return sum;
    }, 0);

    const reportedScore = data.vyrion_index.score || 0;
    const scoreDrift = Math.abs(computedScore - reportedScore);

    if (scoreDrift > 1.0) {
      warn(`S_final recomputed as ${computedScore.toFixed(2)} but reported as ${reportedScore} — drift ${scoreDrift.toFixed(2)} pts`);
    } else {
      pass(`S_final verified: computed ${computedScore.toFixed(2)} ≈ reported ${reportedScore}`);
    }

  } else {
    fail('vyrion_index.components block is missing or not an object');
  }

} else {
  fail('vyrion_index block is entirely missing');
}

// ── CHECK 4: Atmosphere block ─────────────────────────────────────────────
if (data.atmosphere) {
  if (data.atmosphere.co2) {
    const co2 = data.atmosphere.co2;

    check(
      typeof co2.ppm === 'number' && !isNaN(co2.ppm),
      `atmosphere.co2.ppm is a number: ${co2.ppm}`,
      `atmosphere.co2.ppm is not a number: "${co2.ppm}"`
    );

    if (typeof co2.ppm === 'number') {
      // CO₂ sanity range
      if (co2.ppm < TRUTH.co2SanityRange.min || co2.ppm > TRUTH.co2SanityRange.max) {
        warn(`atmosphere.co2.ppm ${co2.ppm} is outside expected range [${TRUTH.co2SanityRange.min}–${TRUTH.co2SanityRange.max}] ppm — verify NOAA feed`);
      } else {
        pass(`atmosphere.co2.ppm ${co2.ppm} ppm within expected range`);
      }
    }

    check(
      typeof co2.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(co2.date),
      `atmosphere.co2.date is a valid date string: "${co2.date}"`,
      `atmosphere.co2.date is not a valid YYYY-MM-DD string: "${co2.date}"`
    );

    // Warn if CO₂ date is more than 10 days stale
    if (typeof co2.date === 'string') {
      const co2Age = Math.floor((Date.now() - new Date(co2.date).getTime()) / 86400000);
      if (co2Age > 10) {
        warn(`atmosphere.co2.date "${co2.date}" is ${co2Age} days old — NOAA data may be delayed`);
      } else {
        pass(`atmosphere.co2.date is recent: ${co2Age} day(s) old`);
      }
    }

    check(
      typeof co2.retrieved === 'string',
      'atmosphere.co2.retrieved timestamp present',
      'atmosphere.co2.retrieved timestamp missing'
    );

  } else {
    warn('atmosphere.co2 is null — NOAA GML fetch failed, using fallback');
  }
} else {
  fail('atmosphere block is missing');
}

// ── CHECK 5: Cryosphere block ─────────────────────────────────────────────
if (data.cryosphere) {
  ['arctic', 'antarctic'].forEach(pole => {
    if (data.cryosphere[pole]) {
      const ice = data.cryosphere[pole];
      check(
        typeof ice.extent_mkm2 === 'number',
        `cryosphere.${pole}.extent_mkm2 is a number: ${ice.extent_mkm2}`,
        `cryosphere.${pole}.extent_mkm2 is not a number`
      );
      check(
        typeof ice.score === 'number',
        `cryosphere.${pole}.score is a number: ${ice.score}`,
        `cryosphere.${pole}.score is not a number`
      );
    } else {
      warn(`cryosphere.${pole} is null — NSIDC fetch failed, using fallback`);
    }
  });
} else {
  warn('cryosphere block is missing — NSIDC data unavailable');
}

// ── CHECK 6: Forest block ─────────────────────────────────────────────────
if (data.forest) {
  if (data.forest.wildfire) {
    const wf = data.forest.wildfire;
    check(
      typeof wf.count === 'number' && wf.count >= 0,
      `forest.wildfire.count is a non-negative number: ${wf.count}`,
      `forest.wildfire.count is not a valid number: "${wf.count}"`
    );
    check(
      typeof wf.score === 'number',
      `forest.wildfire.score is a number: ${wf.score}`,
      'forest.wildfire.score is not a number'
    );
  } else {
    warn('forest.wildfire is null — NASA EONET fetch failed, using fallback');
  }
} else {
  warn('forest block is missing');
}

// ── CHECK 7: Freshwater block ─────────────────────────────────────────────
if (data.freshwater) {
  if (data.freshwater.soil_moisture) {
    const sm = data.freshwater.soil_moisture;
    check(
      typeof sm.moisture_avg_m3 === 'number',
      `freshwater.soil_moisture.moisture_avg_m3 is a number: ${sm.moisture_avg_m3}`,
      'freshwater.soil_moisture.moisture_avg_m3 is not a number'
    );
    check(
      typeof sm.score === 'number',
      `freshwater.soil_moisture.score is a number: ${sm.score}`,
      'freshwater.soil_moisture.score is not a number'
    );
  } else {
    warn('freshwater.soil_moisture is null — Open-Meteo ERA5 fetch failed, using fallback');
  }
} else {
  warn('freshwater block is missing');
}

// ── CHECK 8: Companies block ──────────────────────────────────────────────
check(
  data.companies !== null && typeof data.companies === 'object' && !Array.isArray(data.companies),
  'companies is a keyed object (not an array)',
  'companies is missing or wrong type — expected keyed object'
);

if (data.companies && typeof data.companies === 'object') {
  // All 11 required company IDs present
  TRUTH.requiredCompanyIds.forEach(id => {
    check(
      id in data.companies,
      `Company present: "${id}"`,
      `Missing company: "${id}"`
    );
  });

  // No unexpected extra companies
  const foundIds = Object.keys(data.companies);
  foundIds.forEach(id => {
    if (!TRUTH.requiredCompanyIds.includes(id)) {
      warn(`Unexpected company ID in data: "${id}" — not in canonical list`);
    }
  });

  pass(`Companies count: ${foundIds.length} of ${TRUTH.requiredCompanyIds.length}`);

  // Per-company structural checks
  TRUTH.requiredCompanyIds.forEach(id => {
    const co = data.companies[id];
    if (!co) return;

    const prefix = `[${id}] `;

    // Required base fields
    TRUTH.companyRequiredFields.forEach(f => {
      check(
        co[f] !== undefined && co[f] !== null,
        `${prefix}${f} present`,
        `${prefix}Missing field: "${f}"`
      );
    });

    // CIK is a non-empty string
    check(
      typeof co.cik === 'string' && co.cik.length > 0,
      `${prefix}cik is a non-empty string: "${co.cik}"`,
      `${prefix}cik is missing or empty`
    );

    // EDGAR block — if present, validate structure
    if (co.edgar !== null && co.edgar !== undefined) {
      TRUTH.edgarRequiredFields.forEach(f => {
        check(
          co.edgar[f] !== undefined,
          `${prefix}edgar.${f} present`,
          `${prefix}Missing edgar field: "${f}"`
        );
      });

      // annual_filing — if present must have form and date
      if (co.edgar.annual_filing) {
        check(
          ['10-K', '20-F'].includes(co.edgar.annual_filing.form),
          `${prefix}annual_filing.form is valid: "${co.edgar.annual_filing.form}"`,
          `${prefix}annual_filing.form is not 10-K or 20-F: "${co.edgar.annual_filing.form}"`
        );
        check(
          typeof co.edgar.annual_filing.date === 'string' &&
          /^\d{4}-\d{2}-\d{2}$/.test(co.edgar.annual_filing.date),
          `${prefix}annual_filing.date is valid: "${co.edgar.annual_filing.date}"`,
          `${prefix}annual_filing.date is not YYYY-MM-DD: "${co.edgar.annual_filing.date}"`
        );
      }

      // count_8k_90d is a non-negative integer
      check(
        typeof co.edgar.count_8k_90d === 'number' &&
        Number.isInteger(co.edgar.count_8k_90d) &&
        co.edgar.count_8k_90d >= 0,
        `${prefix}edgar.count_8k_90d is valid: ${co.edgar.count_8k_90d}`,
        `${prefix}edgar.count_8k_90d is not a valid non-negative integer`
      );

      // High 8-K density signal — warn for institutional flag
      if (co.edgar.count_8k_90d >= 8) {
        warn(`${prefix}HIGH 8-K density: ${co.edgar.count_8k_90d} events/90d — elevated regulatory activity signal`);
      }

    } else if (co.edgar === null) {
      // Unilever has null EDGAR — expected
      if (id === 'unilever') {
        pass(`${prefix}edgar is null — expected for UK-listed entity`);
      } else {
        warn(`${prefix}edgar is null — SEC EDGAR fetch failed for this company`);
      }
    }
  });
}

// ── CHECK 9: Global emissions — informational ─────────────────────────────
if (data.global_emissions === null || data.global_emissions === undefined) {
  warn('global_emissions is null — World Bank API fetch failed (expected, annual data 2–3yr lag)');
} else {
  pass('global_emissions data present');
}

// ─────────────────────────────────────────────────────────────────────────────
//  REPORT
// ─────────────────────────────────────────────────────────────────────────────
const CYAN   = '\x1b[36m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED    = '\x1b[31m';
const DIM    = '\x1b[2m';
const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';

console.log(`\n${CYAN}${BOLD}══════════════════════════════════════════════════════════════${RESET}`);
console.log(`${CYAN}${BOLD}  VYRION Schema Validator — v2.0${RESET}`);
console.log(`${CYAN}${BOLD}  conscience-data.json · ${new Date().toUTCString().replace(' GMT','')} UTC${RESET}`);
console.log(`${CYAN}${BOLD}══════════════════════════════════════════════════════════════${RESET}\n`);

// Summary stats
if (data.vyrion_index?.score) {
  console.log(`${DIM}  VYRION Index:  ${data.vyrion_index.score} ± ${TRUTH.uncertainty} / 100  ·  Day ${data.vyrion_index.dayNumber || '?'}${RESET}`);
}
if (data.atmosphere?.co2?.ppm) {
  console.log(`${DIM}  CO₂:           ${data.atmosphere.co2.ppm} ppm  ·  ${data.atmosphere.co2.date}${RESET}`);
}
if (data.meta?.script_version) {
  console.log(`${DIM}  Script v${data.meta.script_version}  ·  Runtime ${data.meta.runtime_ms}ms  ·  Live indicators: ${Object.values(data.meta.live_indicators || {}).filter(Boolean).length}/${TRUTH.liveIndicatorKeys.length}${RESET}`);
}
console.log('');

// Warnings
if (warnings.length > 0) {
  console.log(`${YELLOW}${BOLD}WARNINGS (${warnings.length}):${RESET}`);
  warnings.forEach(w => console.log(`  ${YELLOW}⚠  ${w}${RESET}`));
  console.log('');
}

// Errors
if (errors.length > 0) {
  console.log(`${RED}${BOLD}ERRORS (${errors.length}):${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✕  ${e}${RESET}`));
  console.log('');
  console.log(`${RED}${BOLD}✕ Validation FAILED — ${errors.length} error(s). Fix before committing.${RESET}`);
  console.log(`${DIM}  Report errors: contact@vyrion.earth · CHANGELOG.md${RESET}\n`);
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}✓ Validation PASSED — ${passes.length} checks clean · conscience-data.json v${data.meta?.script_version || '?'}${RESET}`);
  if (warnings.length > 0) {
    console.log(`${YELLOW}  ${warnings.length} warning(s) noted above — review but not blocking.${RESET}`);
  }
  console.log(`${DIM}  Open Proof Protocol active · contact@vyrion.earth · github.com/DablerFrost/Vyrion${RESET}\n`);
  process.exit(0);
}
