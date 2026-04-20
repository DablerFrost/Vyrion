/**
 * VYRION Schema Validator — v2.8
 * Run before every commit: node scripts/validate-schema.js
 * Place this file at: /scripts/validate-schema.js
 *
 * Checks conscience-data.json against known UI claims.
 * Exits 1 (fail) if drift detected. Exits 0 (pass) if clean.
 * Wire into GitHub Actions to auto-block bad pushes.
 */

const fs   = require('fs');
const path = require('path');

// ── Load JSON ────────────────────────────────────────────────────────
const jsonPath = path.join(__dirname, '..', 'conscience-data.json');

if (!fs.existsSync(jsonPath)) {
  fail('conscience-data.json not found at repo root.');
}

let data;
try {
  data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {
  fail('conscience-data.json is not valid JSON: ' + e.message);
}

// ── KNOWN GROUND TRUTH ───────────────────────────────────────────────
// Update these values whenever scores or structure changes.
// This is the single checkpoint that catches drift.
const TRUTH = {
  version:           '2.8',
  companiesCount:    11,
  breach:            5,
  warning:           3,
  onTrack:           3,
  totalLawsuits:     97,
  requiredCompanyIds: [
    'exxon','bp','shell','delta','starbucks',
    'walmart','meta','amazon','microsoft','unilever','apple'
  ],
  requiredTopFields: [
    'version','generated','methodology','index','summary','sources','scoringFactors','companies'
  ],
  requiredCompanyFields: [
    'id','name','ticker','sector','cik','score','band','bandLabel',
    'pledge','pledgeSource','reality','realitySource',
    'cdpGrade','cdpYear','influenceMap','sbti','sbtiStatus',
    'sabinCases','sabinUpdated','tpi','factors','edgarCik'
  ],
  requiredFactorFields: ['factor','maxPoints','earnedPoints','source'],
  validBands:  ['breach','warning','on-track'],
  scoreRanges: { breach: [0,30], warning: [31,60], 'on-track': [61,100] }
};

const errors   = [];
const warnings = [];

// ── CHECKS ───────────────────────────────────────────────────────────

// 1. Version
check(data.version === TRUTH.version,
  'Version mismatch: JSON has "' + data.version + '", expected "' + TRUTH.version + '"');

// 2. Top-level fields
TRUTH.requiredTopFields.forEach(f => {
  check(data[f] !== undefined, 'Missing top-level field: "' + f + '"');
});

// 3. Summary counts
check(data.summary, 'Missing summary object');
if (data.summary) {
  check(data.summary.companiesTracked === TRUTH.companiesCount,
    'summary.companiesTracked is ' + data.summary.companiesTracked + ', expected ' + TRUTH.companiesCount);
  check(data.summary.breach === TRUTH.breach,
    'summary.breach is ' + data.summary.breach + ', expected ' + TRUTH.breach);
  check(data.summary.warning === TRUTH.warning,
    'summary.warning is ' + data.summary.warning + ', expected ' + TRUTH.warning);
  check(data.summary.onTrack === TRUTH.onTrack,
    'summary.onTrack is ' + data.summary.onTrack + ', expected ' + TRUTH.onTrack);
  check(data.summary.activeLawsuits === TRUTH.totalLawsuits,
    'summary.activeLawsuits is ' + data.summary.activeLawsuits + ', expected ' + TRUTH.totalLawsuits);
}

// 4. Companies array
check(Array.isArray(data.companies), 'companies must be an array');
check(data.companies.length === TRUTH.companiesCount,
  'companies.length is ' + data.companies.length + ', expected ' + TRUTH.companiesCount);

// 5. All required company IDs present
const ids = (data.companies || []).map(c => c.id);
TRUTH.requiredCompanyIds.forEach(id => {
  check(ids.includes(id), 'Missing company id: "' + id + '"');
});

// 6. Per-company field checks
(data.companies || []).forEach(co => {
  const prefix = '[' + (co.id || '?') + '] ';

  // Required fields
  TRUTH.requiredCompanyFields.forEach(f => {
    check(co[f] !== undefined, prefix + 'Missing field: "' + f + '"');
  });

  // Score is a number
  check(typeof co.score === 'number', prefix + 'score must be a number, got: ' + typeof co.score);

  // Band is valid
  check(TRUTH.validBands.includes(co.band),
    prefix + 'Invalid band: "' + co.band + '"');

  // Score matches band range
  if (typeof co.score === 'number' && TRUTH.validBands.includes(co.band)) {
    const [min, max] = TRUTH.scoreRanges[co.band];
    check(co.score >= min && co.score <= max,
      prefix + 'Score ' + co.score + ' does not match band "' + co.band + '" range ' + min + '-' + max);
  }

  // Factors array
  check(Array.isArray(co.factors) && co.factors.length === 4,
    prefix + 'factors must be array of 4 items');

  (co.factors || []).forEach((f, i) => {
    TRUTH.requiredFactorFields.forEach(field => {
      check(f[field] !== undefined, prefix + 'factors[' + i + '] missing "' + field + '"');
    });
  });

  // Factor sum matches score
  if (Array.isArray(co.factors) && co.factors.length === 4) {
    const sum = co.factors.reduce((a, f) => a + (f.earnedPoints || 0), 0);
    if (sum !== co.score) {
      warn(prefix + 'Factor sum (' + sum + ') does not match score (' + co.score + ')');
    }
  }

  // sabinUpdated is a date string
  if (co.sabinUpdated) {
    check(/^\d{4}-\d{2}-\d{2}$/.test(co.sabinUpdated),
      prefix + 'sabinUpdated must be YYYY-MM-DD, got: ' + co.sabinUpdated);
  }
});

// 7. Index object
check(data.index, 'Missing index object');
if (data.index) {
  check(typeof data.index.score === 'number', 'index.score must be a number');
  check(data.index.uncertainty === 1.8, 'index.uncertainty must be 1.8');
  check(typeof data.index.dayNumber === 'number', 'index.dayNumber must be a number');
}

// ── REPORT ───────────────────────────────────────────────────────────
console.log('\n\x1b[36m[VYRION] Schema validation — conscience-data.json\x1b[0m\n');

if (warnings.length > 0) {
  console.log('\x1b[33mWARNINGS (' + warnings.length + '):\x1b[0m');
  warnings.forEach(w => console.log('  ⚠  ' + w));
  console.log('');
}

if (errors.length > 0) {
  console.log('\x1b[31mERRORS (' + errors.length + '):\x1b[0m');
  errors.forEach(e => console.log('  ✕  ' + e));
  console.log('\n\x1b[31m✕ Validation FAILED — ' + errors.length + ' error(s). Fix before committing.\x1b[0m\n');
  process.exit(1);
} else {
  console.log('\x1b[32m✓ Validation PASSED — ' + data.companies.length + ' companies · v' + data.version + '\x1b[0m');
  if (warnings.length > 0) console.log('\x1b[33m  ' + warnings.length + ' warning(s) noted above.\x1b[0m');
  console.log('');
  process.exit(0);
}

// ── HELPERS ──────────────────────────────────────────────────────────
function check(condition, message) {
  if (!condition) errors.push(message);
}
function warn(message) {
  warnings.push(message);
}
function fail(message) {
  console.error('\n\x1b[31m[VYRION Validator] FATAL: ' + message + '\x1b[0m\n');
  process.exit(1);
}
