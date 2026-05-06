[README (3).md](https://github.com/user-attachments/files/27416740/README.3.md)
# VYRION CONSCIENCE
**System Architecture Specification · v3.0 · May 2026**

Live system: https://www.vyrion.earth  
Data interface: https://www.vyrion.earth/conscience-data.html  
Raw ledger: https://dablerfrost.github.io/Vyrion/conscience-data.json  
Contact: contact@vyrion.earth

> A planetary accountability operating system built on verifiable environmental and corporate data.

---

## 1. System Overview

CONSCIENCE is a multi-layer civic intelligence system that measures the divergence between corporate climate commitments and real-world verified outcomes.

It operates as a distributed architecture composed of five functional layers:

1. Data Layer  
2. Scoring & Index Layer  
3. Publication Layer  
4. Interface Layer  
5. Automation Layer

---

## 2. System Architecture

### 2.1 Data Layer (`/data`)

The system's source-of-truth repository.

**Contents:**
- `conscience-data.json` — primary corporate accountability ledger
- Normalized environmental and corporate signals
- Daily-updated datasets from public-domain sources

**Purpose:**
- Maintain immutable structured truth
- Feed scoring, index, and visualization systems

---

### 2.2 Scoring & Index Layer

**CONSCIENCE — Corporate Accountability Engine**

Scores 11 major corporations against Paris Agreement 1.5°C pathways.  
Derived from four public data sources cross-referenced against independent registries:

| Factor | Max Points | Source |
|---|---|---|
| Pledge Quality | 30 | Company filings · SBTi registry |
| CDP Performance | 25 | CDP annual public responses |
| Lobbying Alignment | 25 | InfluenceMap public profiles |
| Legal Exposure | 20 | Sabin Center · Columbia Law |

**Band classification (locked vocabulary):**

| Band | Score Range |
|---|---|
| BREACH | 0 – 30 |
| WARNING | 31 – 60 |
| ON TRACK | 61 – 100 |

Current distribution: **5 BREACH · 3 WARNING · 3 ON TRACK**

---

**VYRION Index — Planetary Health Benchmark**

The world's first daily investable planetary health score.  
Computed across 8 Earth systems, 48 indicators, against a pre-industrial 1850–1900 baseline of 100/100.

| Earth System | Weight |
|---|---|
| Atmosphere | 22% |
| Ocean | 18% |
| Ice | 14% |
| Forest | 13% |
| Biodiversity | 12% |
| Freshwater | 10% |
| Soil | 7% |
| Corporate Accountability | 4% |

**Formula:** `S_final = Σ(W_i × S_i)`  
**Uncertainty:** ±1.8 points propagated. Minimum detectable change: ±0.5 points.  
**Current score:** 41.2 ± 1.8 / 100

---

### 2.3 Publication Layer (`/record`)

Converts structured outputs into forensic-grade reporting.

**The Record**
- Weekly corporate deep-dive reports (published Wednesdays)
- Evidence-backed narrative analysis
- Source-linked findings
- Immutable publication format — never overwritten, only appended

**Archive System**
- Time-series snapshots of VYRION Index
- Daily historical logs via ATLAS
- Reconstructable dataset history

**Methodology Layer (`/docs/system`)**
- Versioned scoring definitions
- Indicator-level documentation
- System evolution tracking

---

### 2.4 Interface Layer (`/public`)

User-facing transparency and exploration system.

| Interface | File | Purpose |
|---|---|---|
| CONSCIENCE Dashboard | `conscience.html` | Live scores, risk bands, portfolio analysis |
| ATLAS | `atlas.html` | Daily planetary intelligence record. 8 Earth system cards, 5 live API feeds. The authoritative daily record. |
| SHIELD | `shield.html` | 14-day global hazard monitoring — seismic, wildfire, flood, volcanic, severe storm |
| ROOT | `root.html` | Core system routing and state orchestration layer — governs module navigation, session flow, and OS-level transitions |
| NEXAN | `nexan.html` | Identity and context layer — manages system presence, entity mapping, and cross-module coherence within VYRION OS |
| Data Viewer | `conscience-data.html` | Human-readable structured JSON feed |
| Primary Entry | `index.html` | System dashboard and navigation |

### 2.5 Automation Layer (`/.github/workflows`)

Continuous data processing system.

**Schedules:**
- `conscience-daily.yml` — runs `fetch-conscience-data.js`, triggers 00:00 and 12:00 UTC
- `shield-update.yml` — runs `fetch-shield-data.js`, triggers 00:00 and 12:00 UTC

**Functions:**
- Daily data ingestion from NOAA, NASA EONET, USGS, GBIF, Open-Meteo Marine
- Schema validation and normalization
- Environmental signal updates to `data/shield-snapshot.json` with live API fallback

---

## 3. Data Flow

```
External Data Sources (NOAA · NASA · USGS · GBIF · SEC EDGAR · CDP · InfluenceMap · Sabin)
        ↓
Automation Layer (GitHub Actions · 00:00 + 12:00 UTC)
        ↓
Data Layer (/data — conscience-data.json · shield-snapshot.json)
        ↓
Scoring & Index Engines (CONSCIENCE · VYRION Index)
        ↓
Validated Outputs (scores · bands · index · hazard levels)
        ↓
Publication Layer (/record — The Record · Archive · Methodology)
        ↓
Interface Layer (/public — CONSCIENCE · ATLAS · SHIELD · Data Viewer)
```

---

## 4. Core Principles

**4.1 Verifiability First**  
Every output traces back to public, auditable sources. No proprietary or estimated data enters the scoring pipeline.

**4.2 No Hidden Modelling**  
All transformations are explicit and reproducible. Full methodology published at `/docs/system`.

**4.3 Immutable Publication**  
Published records are never overwritten — only appended with corrections. Timestamps are preserved.

**4.4 Dual-System Validation**  
Corporate self-reporting is cross-referenced against independent datasets (CDP, InfluenceMap, Sabin Center, SBTi registry, SEC EDGAR).

**4.5 Time-Aware Scoring**  
All outputs are timestamped to reflect system state at time of computation. Day count computed dynamically from March 18, 2026 origin.

---

## 5. System Outputs

**Primary Outputs**
- CONSCIENCE corporate scores (0–100 · BREACH / WARNING / ON TRACK)
- VYRION planetary index (daily · 0–100 · ±1.8 uncertainty)
- Risk band classification
- Legal exposure mapping (Sabin Center case counts)
- Capital allocation trajectory signals

**Secondary Outputs**
- Audit packs (source bundles per company)
- Change detection logs
- Portfolio risk aggregation (stress tester)
- Historical reconstruction archives

---

## 6. Repository Architecture

```
/
├── public/          → Interface layer (dashboards, UI)
│   ├── index.html
│   ├── conscience.html
│   ├── atlas.html
│   └── shield.html
├── data/            → Raw + processed datasets
│   ├── conscience-data.json
│   └── shield-snapshot.json
├── record/          → Published investigative reports (The Record)
├── archive/         → Historical time-series system
├── docs/
│   └── system/      → Methodology + system specification
└── .github/
    └── workflows/   → Automation layer (CI/CD + data pipelines)
```

**Backend intelligence layer:** [`vyrion-core`](https://github.com/dablerfrost/vyrion-core) — private scoring engine, data ingestion pipelines, and internal API.

---

## 7. Open Proof Protocol

All outputs are continuously verifiable.

If an error is identified:
- It is publicly logged
- A correction is appended (never overwritten)
- Timestamp is preserved
- Source trace is updated

> "Find the error. We will publish the correction."

---

## 8. System Identity

CONSCIENCE is not a dashboard.

It is a real-time accountability infrastructure for climate-relevant corporate behavior — a planetary accountability operating system built on verifiable public data.

**VYRION PBC**  
Planetary Systems Intelligence Layer  
Founder: Tyler Frost / DablerFrost  
Hilo, Hawaii · vyrion.earth
