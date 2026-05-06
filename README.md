[README (4).md](https://github.com/user-attachments/files/27423035/README.4.md)
# VYRION CONSCIENCE
**Planetary Accountability Infrastructure · v3.0 · May 2026**

Live platform: [vyrion.earth](https://www.vyrion.earth)  
Data interface: [vyrion.earth/conscience-data.html](https://www.vyrion.earth/conscience-data.html)  
Raw ledger: [conscience-data.json](https://dablerfrost.github.io/Vyrion/conscience-data.json)  
Contact: contact@vyrion.earth

> The world's first daily investable planetary health benchmark.

---

## What This Is

VYRION is a planetary accountability operating system built on verifiable public data. It measures the divergence between corporate climate commitments and real-world verified outcomes, and publishes a daily 0–100 planetary health score computed across 8 Earth systems.

This repository is the live infrastructure for two public-facing systems:

- **CONSCIENCE** — corporate pledge verification engine. 11 companies scored against Paris Agreement 1.5°C pathways.
- **VYRION Index** — daily planetary health benchmark. 48 indicators. 8 Earth systems. Pre-industrial baseline = 100/100.

Both are live and publicly accessible. Both update daily via automated pipelines.

---

## Repository Structure

```
/
├── index.html              → CONSCIENCE dashboard (live · vyrion.earth)
├── atlas.html              → ATLAS planetary intelligence record (live)
├── shield.html             → SHIELD 14-day hazard monitor (live)
├── conscience-data.json    → Primary corporate accountability ledger (live feed)
├── conscience-data.html    → Human-readable data viewer (live)
│
├── archive/                → Time-series Index history. Immutable — never overwritten.
│   └── index.html
│
├── record/                 → The Record. Weekly investigative reports.
│   ├── index.html
│   ├── issue-001/          → BP
│   ├── issue-002/          → ExxonMobil
│   └── issue-003/          → Shell
│
├── data/                   → Raw + processed datasets
│   └── shield-snapshot.json
│
├── docs/
│   └── system/             → Methodology, scoring definitions, governance
│       ├── VYRION-METHODOLOGY-v1.0.md
│       ├── CONSCIENCE-METHODOLOGY.md
│       ├── VYRION-MASTER.md
│       └── VYRION-INDEX.md
│
└── .github/
    └── workflows/          → Automation layer
        ├── conscience-daily.yml    → 00:00 + 12:00 UTC
        └── shield-update.yml       → 00:00 + 12:00 UTC
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

Full derivation: [`docs/system/CONSCIENCE-METHODOLOGY.md`](docs/system/CONSCIENCE-METHODOLOGY.md)

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
**Current score:** 41.2 ± 1.8 / 100  
**Origin:** Day 1 — March 18, 2026 · 41.3 / 100

Full methodology: [`docs/system/VYRION-METHODOLOGY-v1.0.md`](docs/system/VYRION-METHODOLOGY-v1.0.md)

---

## Automation

Two GitHub Actions pipelines run on a fixed schedule:

| Workflow | Schedule | Function |
|---|---|---|
| `conscience-daily.yml` | 00:00 + 12:00 UTC | Fetches NOAA, SEC EDGAR, CDP signals. Updates `conscience-data.json`. |
| `shield-update.yml` | 00:00 + 12:00 UTC | Fetches USGS, NASA EONET. Updates `data/shield-snapshot.json` with live API fallback. |

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

---

## Data Sources

All data is public-domain or open-license. No proprietary data enters the scoring pipeline.

| Source | Type | Used In |
|---|---|---|
| NOAA GML | Live API | Index · Atmosphere |
| NASA EONET | Live API | SHIELD · ATLAS |
| USGS Earthquake Hazards | Live API | SHIELD |
| GBIF | Live API | Index · Biodiversity |
| Open-Meteo Marine | Live API | Index · Ocean |
| CDP | Annual public responses | CONSCIENCE |
| InfluenceMap | Continuous public profiles | CONSCIENCE |
| Sabin Center | Litigation database | CONSCIENCE |
| SBTi Registry | Public registry | CONSCIENCE |
| SEC EDGAR | CORS-open public API | CONSCIENCE |

---

## Core Principles

**Verifiability first.** Every output traces to a public, auditable source. Source links are embedded at the point of claim — not in footnotes.

**No hidden modelling.** All transformations are explicit and reproducible. Full methodology is published in `docs/system/`.

**Immutable publication.** Published records are never overwritten — only appended with corrections. Timestamps are preserved.

**Open Proof Protocol.** Errors are reported to contact@vyrion.earth and published as corrections within 24 hours. Day 2 correction (Arctic sea ice) issued March 20, 2026 — publicly logged.

---

## Legal Structure

VYRION is a Public Benefit Corporation (PBC). No financial relationship to any scored company. Scoring is derived entirely from public data sources.

VYRION PBC is a subsidiary of The Nexan Institute.

Not financial advice. Scores are informational outputs derived from public data.

Disclaimers: [`docs/system/LEGAL-DISCLAIMER.md`](docs/system/LEGAL-DISCLAIMER.md) · [`docs/system/INVESTABLE-DISCLAIMER.md`](docs/system/INVESTABLE-DISCLAIMER.md)

---

## Contact

**Tyler Frost / DablerFrost**  
Founder, VYRION PBC · The Nexan Institute  
Hilo, Hawaii  
contact@vyrion.earth  
[x.com/DablerFrost](https://x.com/DablerFrost)  

> Find the error. We will publish the correction.
