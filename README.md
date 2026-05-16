# VYRION CONSCIENCE
**Planetary Accountability Infrastructure · v3.1 · May 2026**

Live platform: [vyrion.earth](https://www.vyrion.earth)  
Data interface: [vyrion.earth/conscience-data.html](https://www.vyrion.earth/conscience-data.html)  
Raw ledger: [conscience-data.json](https://www.vyrion.earth/conscience-data.json)  
Contact: contact@vyrion.earth

> The world's first daily investable planetary health benchmark.

---

## What This Is

VYRION is a planetary accountability operating system built on verifiable public data. It measures the divergence between corporate climate commitments and real-world verified outcomes, and publishes a daily 0–100 planetary health score computed across 8 Earth systems.

This repository is the live infrastructure for five public-facing systems ( 8 to be total ):

- **CONSCIENCE** — corporate pledge verification engine. 11 companies scored against Paris Agreement 1.5°C pathways.
- **VYRION Index** — daily planetary health benchmark. 48 indicators. 8 Earth systems. Pre-industrial baseline = 100/100.
- **SHIELD** — 14-day global hazard monitor. Seismic, wildfire, storm, flood, and volcanic event tracking.
- **ATLAS** — The VYRION Index backbone. 8 Earth systems, 48 indicators, scored against the pre-industrial 1850–1900 baseline. This is where the number comes from.
- **ROOT** — converts multi-source licensed Earth observation data into a verified, time-series model of soil stability, agricultural system behavior, land degradation velocity, water–soil interaction, and regenerative land recovery.

All three are live and publicly accessible. Data pipelines update daily via automated GitHub Actions.

---

## Repository Structure

```
/
├── index.html              → System dashboard · primary entry point
├── conscience.html         → CONSCIENCE corporate pledge tracker (live)
├── atlas.html              → ATLAS planetary intelligence record (live)
├── shield.html             → SHIELD 14-day hazard monitor (live)
├── about.html              → About VYRION PBC
├── nexan.html              → The Nexan Institute
├── root.html               → ROOT module
├── conscience-data.html    → Human-readable structured data viewer
├── conscience-data.json    → Primary corporate accountability ledger (live feed)
├── manifest.json           → PWA manifest
├── package.json            → Node.js config · ESM ("type": "module")
├── CNAME                   → Custom domain · vyrion.earth
│
├── scripts/                → Data fetch scripts (executed by GitHub Actions)
│   ├── fetch-conscience-data.js
│   ├── fetch-shield-data.js
│   └── validate-schema.js
│
├── assets/                 → Static assets
│   ├── logo.png
│   ├── favicon.ico
│   └── vyrion-config.js
│
├── includes/               → Shared UI components
│   ├── header.html
│   ├── floating-orb.html
│   ├── floating-orb-styles.css
│   ├── QUICK-START.md
│   └── ORBRINTEGRATION-GUIDE.md
│
├── data/                   → Live data snapshots
│   └── shield-snapshot.json    → SHIELD hazard cache · updated 00:10 + 12:10 UTC
│
├── archive/                → VYRION Index history · immutable · never overwritten
│   ├── index.html
│   ├── 2026-03-20.md
│   ├── 2026-03-21.md
│   ├── 2026-03-22.md
│   ├── 2026-03-23.md
│   ├── 2026-03-24.md
│   ├── 2026-03-25.md
│   └── 2026-03-26.md
│
├── record/                 → The Record · weekly investigative reports
│   ├── index.html
│   ├── issue-001.html      → BP
│   ├── issue-002.html      → ExxonMobil
│   ├── issue-003.html      → Shell
│   ├── issue-004.html      → Delta Air Lines
│   ├── issue-005.html      → Starbucks
│   ├── issue-006.html      → Walmart
│   └── issue-007.html      → Meta
│   └── issue-008.html      → Apple
│   └── issue-009.html      → Microsoft
│
├── docs/                   → Documentation and governance
│   ├── system/             → Methodology, scoring definitions, brand, legal
│   │   ├── 01-BRAND-ARCHITECTURE.md
│   │   ├── CHANGELOG.md
│   │   ├── CONSCIENCE-METHODOLOGY.md
│   │   ├── INVESTABLE-DISCLAIMER.md
│   │   ├── METHODOLOGY-ENDORSEMENTS.md
│   │   ├── VYRION-INDEX.md
│   │   └── VYRION-METHODOLOGY-v1.0.md
│   ├── VYRION_ARCHITECTURE.md
│   ├── VYRION_BRAND.md
│   └── VYRION_DAILY_TEMPLATE.md
│
├── VYRION/                 → Business architecture documents
│   ├── VYRION-MASTER.md
│   ├── 02-BUSINESS-MODEL.md
│   ├── 03-DEFENSE-ARCHITECTURE.md
│   ├── 04-CONSCIENCE-MODULE.md
│   ├── 05-VYRION-INDEX.md
│   ├── 06-90-DAY-ROADMAP.md
│   └── 07-COFOUNDER-PITCH.md
│
└── .github/
    └── workflows/          → Automation layer
        ├── conscience-daily.yml    → 00:05 UTC daily
        └── shield-update.yml       → 00:10 + 12:10 UTC daily
```

---

## CONSCIENCE Scoring

11 corporations scored against Paris Agreement 1.5°C pathways. Four public data sources. No proprietary data.

| Factor | Max Points | Source |
|---|---|---|
| Pledge Quality | 30 | Company filings · SBTi registry |
| CDP Performance | 25 | CDP annual public responses |
| Lobbying Alignment | 25 | InfluenceMap public profiles |
| Legal Exposure | 20 | Sabin Center · Columbia Law |

**Band classification:**

| Band | Score Range |
|---|---|
| BREACH | 0 – 30 |
| WARNING | 31 – 60 |
| ON TRACK | 61 – 100 |

Current distribution: **5 BREACH · 3 WARNING · 3 ON TRACK**

Full derivation: [`docs/CONSCIENCE-METHODOLOGY.md`](docs/CONSCIENCE-METHODOLOGY.md)

---

## VYRION Index

Daily 0–100 planetary health score. Pre-industrial 1850–1900 average = 100/100.

| Earth System | Weight | Primary Source |
|---|---|---|
| Atmosphere | 22% | NOAA GML |
| Ocean | 18% | Open-Meteo Marine · OISST |
| Ice | 14% | NSIDC · NASA |
| Forest | 13% | NASA FIRMS · GBIF |
| Biodiversity | 12% | GBIF |
| Freshwater | 10% | USGS |
| Soil | 7% | FAO · ERA5 |
| Corporate Accountability | 4% | CONSCIENCE engine |

**Formula:** `S_final = Σ(W_i × S_i)`  
**Uncertainty:** ±1.8 points propagated. Minimum detectable change: ±0.5.  
**Current score:** 36.1 ± 1.8 / 100 · automated · daily computation  
**Origin:** Day 1 — March 18, 2026 · 41.3 / 100

Full methodology: [`docs/VYRION-METHODOLOGY-V1.0.md`](docs/VYRION-METHODOLOGY-V1.0.md)

---

## SHIELD

14-day global hazard monitor. Five hazard categories tracked in real time.

| Hazard | Source | Update Cadence |
|---|---|---|
| Seismic (M4.5+) | USGS Earthquake Hazards | Continuous |
| Wildfire | NASA EONET | Continuous |
| Severe Storm | NASA EONET | Continuous |
| Flood | NASA EONET | Continuous |
| Volcanic | NASA EONET | Continuous |

**Threat Algorithm v1.1:** M4.5–5.4 excluded as background seismicity.  
**Thresholds:** NOMINAL <2 · WATCH 2–6 · ELEVATED 7–14 · CRITICAL 15+

Snapshot cached at `data/shield-snapshot.json` — updated twice daily by `shield-update.yml`. Live APIs are the primary source; snapshot serves as immediate-load fallback.

---

## Automation

Two GitHub Actions pipelines run on fixed schedules.

| Workflow | Schedule | Function |
|---|---|---|
| `conscience-daily.yml` | 00:05 UTC daily | Fetches NOAA CO₂, SEC EDGAR (11 companies), Open-Meteo ERA5, World Bank emissions. Updates `conscience-data.json`. |
| `shield-update.yml` | 00:10 + 12:10 UTC | Fetches USGS M4.5+ seismic feed, NASA EONET (wildfire, storm, flood, volcanic). Computes threat level. Updates `data/shield-snapshot.json`. |

SHIELD runs twice daily — seismic and hazard data changes throughout the day.  
CONSCIENCE runs once daily — source data (CDP, SBTi, InfluenceMap, EDGAR) does not update intraday.  
On fetch failure, both scripts fall back to the previous snapshot rather than writing empty data.

---

## The Record

Weekly investigative reports published every Wednesday. Each issue profiles one tracked company — pledge vs. verified reality. Source-cited. Immutable. Never overwritten.

| Issue | Company | Published |
|---|---|---|
| 001 | BP | March 18, 2026 |
| 002 | ExxonMobil | March 25, 2026 |
| 003 | Shell | April 1, 2026 |
| 004 | Delta Air Lines | April 8, 2026 |
| 005 | Starbucks | April 15, 2026 |
| 006 | Walmart | April 22, 2026 |
| 007 | Meta | April 29, 2026 |
| 008 | Apple | May 06, 2026 |
| 009 | Microsoft | May 13, 2026 |
---

## Data Sources

All data is public-domain or open-license. No proprietary data enters the scoring pipeline.

| Source | Type | Used In |
|---|---|---|
| NOAA GML | Live API | Index · Atmosphere |
| NASA EONET | Live API | SHIELD · ATLAS |
| USGS Earthquake Hazards | Live API | SHIELD |
| GBIF | Live API | Index · Biodiversity |
| Open-Meteo ERA5 | Live API | Index · Atmosphere |
| World Bank Open Data | Annual API | Index · Emissions |
| CDP | Annual public responses | CONSCIENCE |
| InfluenceMap | Continuous public profiles | CONSCIENCE |
| Sabin Center | Litigation database | CONSCIENCE |
| SBTi Registry | Public registry | CONSCIENCE |
| SEC EDGAR | CORS-open public API | CONSCIENCE |

---

## Core Principles

**Verifiability first.** Every output traces to a public, auditable source. Source links are embedded at the point of claim.

**No hidden modelling.** All transformations are explicit and reproducible. Full methodology published in `docs/`.

**Immutable publication.** Published records are never overwritten — only appended with corrections. Timestamps are preserved.

**Open Proof Protocol.** Errors reported to contact@vyrion.earth are published as corrections within 24 hours.

---

## Legal Structure

VYRION is a Public Benefit Corporation (PBC). No financial relationship to any scored company. Scoring is derived entirely from public data sources.

VYRION PBC is a subsidiary of The Nexan Institute.

Not financial advice. Scores are informational outputs derived from public data.

Disclaimers: [`docs/INVESTABLE-DISCLAIMER.md`](docs/INVESTABLE-DISCLAIMER.md)

---

## Contact

**Tyler Frost / DablerFrost**  
Founder, VYRION PBC · The Nexan Institute  
Hilo, Hawaii  
contact@vyrion.earth  
[x.com/DablerFrost](https://x.com/DablerFrost)

> Find the error. We will publish the correction.
