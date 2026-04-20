/**
 * VYRION CORE CONFIG — v2.8
 * Single source of truth for all VYRION pages.
 * Every page imports this. No hardcoded metrics anywhere else.
 *
 * HOW TO USE:
 * Add this to your repo as: /assets/vyrion-config.js
 * Then in each HTML file, add BEFORE your main <script>:
 *   <script src="/assets/vyrion-config.js"></script>
 *
 * All values in your existing scripts that are hardcoded
 * (day count, index score, band counts, version, etc.)
 * should reference VYRION_CONFIG instead.
 */

const VYRION_CONFIG = {

  /* ── VERSION ─────────────────────────────────────────── */
  version: 'v2.8',
  releaseDate: '2026-04-18',

  /* ── VYRION INDEX ────────────────────────────────────── */
  index: {
    dayOneISO: '2026-03-18T00:00:00-10:00', // Hawaii time — do not change
    currentScore: 41.2,
    uncertainty: 1.8,
    minDetectableChange: 0.5,
    // Computed dynamically — do not hardcode
    get dayNumber() {
      const d1 = new Date(this.dayOneISO);
      return Math.max(1, Math.floor((Date.now() - d1) / 86400000) + 1);
    },
    get dateLabel() {
      return new Date().toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
    },
    get displayString() {
      return this.currentScore.toFixed(1) + ' \u00b1 ' + this.uncertainty + ' / 100';
    },
    get tickerSub() {
      return '/ 100 \u00b7 Day ' + this.dayNumber + ' \u00b7 ' + this.dateLabel;
    }
  },

  /* ── CONSCIENCE HUB ──────────────────────────────────── */
  conscience: {
    version: 'v2.8',
    companiesTracked: 11,
    bandCounts: {
      breach: 5,   // 0–30
      warning: 3,  // 31–60
      onTrack: 3   // 61–100
    },
    activeLawsuits: 97,
    sourcesCount: 6,
    get bandSummary() {
      const b = this.bandCounts;
      return b.breach + ' Breach \u00b7 ' + b.warning + ' Warning \u00b7 ' + b.onTrack + ' On Track';
    }
  },

  /* ── 8 MODULES ───────────────────────────────────────── */
  modules: [
    {
      id:       'atlas',
      name:     'ATLAS',
      slug:     'atlas',
      status:   'live',
      href:     '/atlas.html',
      accent:   '#00D4FF',
      accentBg: 'rgba(0,212,255,0.08)',
      accentBd: 'rgba(0,212,255,0.25)',
      icon:     '◈',
      tagline:  'Real-time planetary intelligence',
      description: 'Live Earth system data backbone. Atmospheric CO\u2082, ocean temperature, Arctic sea ice, forest cover, and biodiversity indicators — aggregated, normalized, and streamed into CONSCIENCE continuously.',
      systems:  ['Atmosphere', 'Ocean', 'Cryosphere', 'Forest', 'Biodiversity'],
      dataRefresh: '15 min'
    },
    {
      id:       'shield',
      name:     'SHIELD',
      slug:     'shield',
      status:   'built',
      href:     '/shield.html',
      accent:   '#F03030',
      accentBg: 'rgba(240,48,48,0.07)',
      accentBd: 'rgba(240,48,48,0.25)',
      icon:     '⬟',
      tagline:  '14-day disaster early warning',
      description: 'Global hazard monitoring across 5 categories: Seismic, Wildfire, Severe Storm, Flood, and Volcanic. USGS + NASA EONET feeds. 15-minute refresh. 14-day event log and calendar.',
      systems:  ['Seismic', 'Wildfire', 'Storm', 'Flood', 'Volcanic'],
      dataRefresh: '15 min'
    },
    {
      id:       'root',
      name:     'ROOT',
      slug:     'root',
      status:   'phase2',
      href:     null,
      accent:   '#4CAF72',
      accentBg: 'rgba(76,175,114,0.07)',
      accentBd: 'rgba(76,175,114,0.2)',
      icon:     '◉',
      tagline:  'Regenerative agriculture OS',
      description: 'Soil carbon sequestration tracking, regenerative practice verification, and agricultural land-use monitoring. Connects farm-level data to planetary soil health indicators.',
      systems:  ['Soil', 'Freshwater', 'Biodiversity'],
      dataRefresh: 'Daily'
    },
    {
      id:       'canopy',
      name:     'CANOPY',
      slug:     'canopy',
      status:   'phase2',
      href:     null,
      accent:   '#2E8B57',
      accentBg: 'rgba(46,139,87,0.07)',
      accentBd: 'rgba(46,139,87,0.2)',
      icon:     '◆',
      tagline:  'Reforestation + habitat restoration',
      description: 'Satellite-verified reforestation monitoring. Tracks canopy cover change, habitat corridor integrity, and biodiversity recovery across restoration sites globally.',
      systems:  ['Forest', 'Biodiversity', 'Soil'],
      dataRefresh: 'Weekly'
    },
    {
      id:       'tide',
      name:     'TIDE',
      slug:     'tide',
      status:   'phase2',
      href:     null,
      accent:   '#0096C7',
      accentBg: 'rgba(0,150,199,0.07)',
      accentBd: 'rgba(0,150,199,0.2)',
      icon:     '◎',
      tagline:  'Ocean + water systems',
      description: 'Ocean acidification, sea surface temperature anomalies, freshwater stress indices, and coastal ecosystem health. Integrates Copernicus Marine and NOAA buoy data.',
      systems:  ['Ocean', 'Freshwater'],
      dataRefresh: 'Daily'
    },
    {
      id:       'loop',
      name:     'LOOP',
      slug:     'loop',
      status:   'phase2',
      href:     null,
      accent:   '#FFB84D',
      accentBg: 'rgba(255,184,77,0.07)',
      accentBd: 'rgba(255,184,77,0.2)',
      icon:     '⟳',
      tagline:  'Circular waste economy',
      description: 'Enterprise and municipal circular economy software. Tracks material through entire lifecycle, reroutes waste into manufacturing input streams, and manages e-waste, plastics, and industrial byproducts intelligently.',
      systems:  ['Soil', 'Ocean', 'Atmosphere'],
      dataRefresh: 'Daily'
    },
    {
      id:       'flux',
      name:     'FLUX',
      slug:     'flux',
      status:   'phase2',
      href:     null,
      accent:   '#FFD700',
      accentBg: 'rgba(255,215,0,0.07)',
      accentBd: 'rgba(255,215,0,0.2)',
      icon:     '⚡',
      tagline:  'Clean energy infrastructure',
      description: 'Modular clean energy deployment. Licenses distributed solar, hydrogen, and atmospheric carbon capture systems to cities and industrial operators. Bridges the energy transition gap.',
      systems:  ['Atmosphere', 'Corporate Accountability'],
      dataRefresh: 'Daily'
    },
    {
      id:       'pulse',
      name:     'PULSE',
      slug:     'pulse',
      status:   'phase2',
      href:     null,
      accent:   '#9C6FE4',
      accentBg: 'rgba(156,111,228,0.07)',
      accentBd: 'rgba(156,111,228,0.2)',
      icon:     '◐',
      tagline:  'Impact credit marketplace',
      description: 'Verified impact credit issuance, trading, and retirement. 3–8% transaction fee. Credits tied directly to verified VYRION module outputs — not self-reported.',
      systems:  ['Corporate Accountability'],
      dataRefresh: 'Real-time'
    }
  ],

  /* ── CONSCIENCE SCORE PAYLOAD SCHEMA ─────────────────── */
  // This is the authoritative schema for conscience-data.json
  // UI, README, and data viewer must all match this exactly.
  scoreSchema: {
    version: '2.8',
    generated: null, // ISO timestamp — set at generation time
    methodology: 'https://github.com/DablerFrost/conscience/blob/main/methodology/CONSCIENCE-METHODOLOGY.md',
    index: {
      score: null,        // XX.X
      uncertainty: 1.8,
      dayNumber: null,    // integer
      date: null          // YYYY-MM-DD
    },
    summary: {
      companiesTracked: 11,
      breach: 5,
      warning: 3,
      onTrack: 3,
      activeLawsuits: 97
    },
    companies: [
      // Each entry follows this shape:
      {
        id: null,           // string e.g. 'exxon'
        name: null,         // full name
        ticker: null,
        sector: null,
        cik: null,
        score: null,        // integer 0-100
        band: null,         // 'breach' | 'warning' | 'on-track'
        bandLabel: null,    // 'BREACH' | 'WARNING' | 'ON TRACK'
        cdpGrade: null,
        cdpYear: null,
        influenceMap: null, // grade string e.g. 'F'
        sbti: null,         // 'Not committed' | 'Committed' | 'Approved 1.5°C'
        sabinCases: null,   // integer
        sabinUpdated: null, // YYYY-MM-DD
        tpi: null,          // 'Level X/5'
        factors: [
          // Each scoring factor:
          { factor: null, maxPoints: null, earnedPoints: null, source: null }
        ],
        edgarCik: null,
        edgarLastFiling: null,  // YYYY-MM-DD — fetched live, null if not yet loaded
        edgarForm: null         // '10-K' | '20-F'
      }
    ]
  },

  /* ── SITE METADATA ───────────────────────────────────── */
  site: {
    canonical: 'https://vyrion.earth',
    github:    'https://github.com/DablerFrost/conscience',
    archive:   'https://vyrion.earth/archive',
    record:    'https://vyrion.earth/record',
    email:     'contact@vyrion.earth',
    twitter:   '@DablerFrost',
    instagram: '@dablerfrost'
  },

  /* ── HELPERS ─────────────────────────────────────────── */
  getModule(id) {
    return this.modules.find(m => m.id === id) || null;
  },
  getLiveModules() {
    return this.modules.filter(m => m.status === 'live');
  },
  getBuiltModules() {
    return this.modules.filter(m => m.status === 'built');
  },
  getPhase2Modules() {
    return this.modules.filter(m => m.status === 'phase2');
  }
};

// Freeze to prevent accidental mutation
Object.freeze(VYRION_CONFIG.index);
Object.freeze(VYRION_CONFIG.conscience);
Object.freeze(VYRION_CONFIG.site);

// Expose globally
if (typeof window !== 'undefined') window.VYRION_CONFIG = VYRION_CONFIG;
if (typeof module !== 'undefined') module.exports = VYRION_CONFIG;

console.log(
  '%c[VYRION CORE] Config loaded — ' + VYRION_CONFIG.version +
  ' · Day ' + VYRION_CONFIG.index.dayNumber,
  'color:#00D4FF;font-family:monospace;font-size:11px'
);
