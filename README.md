# VYRION
**Planetary Intelligence Network · v3.1 · May 2026**

Live platform: [https://vyrion.earth/](https://vyrion.earth/)
Data interface: [vyrion.earth/conscience-data.html](https://www.vyrion.earth/conscience-data.html)
Raw ledger: [conscience-data.json](https://www.vyrion.earth/conscience-data.json)
Contact: contact@vyrion.earth

> The planet has a score. Now it has a daily number.

---

## What VYRION Is

VYRION is a Planetary Intelligence Network.

It measures the divergence between corporate climate commitments and verified real-world outcomes — then publishes a daily 0–100 planetary health score computed across 8 Earth systems against the pre-industrial 1850–1900 baseline.

The numbers remain the numbers. Strategy must meet science.

This is not analysis. This is a record. A verified, immutable, daily record of what Earth's systems are actually doing — and what the corporations shaping them have promised, pledged, and delivered.

Eight modules. One network. One score.

| Module | Function | Solves |
|---|---|---|
| **SHIELD** · Disaster Intelligence & Early Warning | Predictive AI providing 2–14 day early warning for floods, wildfires, cyclones, and drought onset. Free public tier for every nation on Earth. | Natural Disasters · Food Security · Climate Resilience |
| **ATLAS** · Real-Time Planetary Intelligence | AI-powered environmental monitoring network. Tracks climate variables, air quality, water levels, soil health, and biodiversity indices in real time. The nervous system of VYRION — all modules draw from ATLAS. | Climate · Air Pollution · Water · Disasters |
| **ROOT** · Regenerative Agriculture OS | AI-guided soil restoration, water-efficient farming protocols, and regenerative land management software. Turns degraded land into living carbon sinks. | Soil Degradation · Water Scarcity · Food Security |
| **CANOPY** · Reforestation & Habitat Restoration | Satellite-guided precision reforestation — AI identifies optimal planting sites, species mix, and climate compatibility. Biodiversity monitoring nodes track species recovery. | Deforestation · Species Extinction · Carbon Capture |
| **FLUX** · Clean Energy Infrastructure | Modular clean energy deployment platform — licensing distributed solar, hydrogen, and atmospheric carbon capture systems to cities and industrial operators. | Climate · Air Pollution · Resource Depletion |
| **TIDE** · Ocean & Water Systems | Scalable ocean plastic remediation hardware and AI routing. Atmospheric and filter-based water purification. Ocean acidification mitigation protocols. | Ocean Pollution · Water Scarcity · Marine Biodiversity |
| **LOOP** · Circular Waste Economy Platform | Enterprise and municipal circular economy software. Tracks materials through entire lifecycle, reroutes waste into manufacturing input streams. | Waste Management · Resource Depletion · Soil Contamination |
| **PULSE** · Impact Economy & Credit Marketplace | Tokenized marketplace for verified carbon, biodiversity, water, and soil credits. Corporations meet compliance. Governments monetize restoration. | All 10 Problems · Economic Engine · Global Incentive Layer |

All systems are publicly accessible. Data pipelines update daily via automated GitHub Actions. No proprietary data. No hidden modeling. Full source lineage published.

---

## CONSCIENCE — Corporate Pledge Verification

Satellite data versus self-reports. The truth layer for the Earth.

11 corporations scored against Paris Agreement 1.5°C pathways using four independent public data sources. No access to proprietary data is required. The divergence between what a company says and what verified data shows is the score.

| Factor | Max Points | Source |
|---|---|---|
| Pledge Quality | 30 | Company filings · SBTi Registry |
| CDP Performance | 25 | CDP annual public responses |
| Lobbying Alignment | 25 | InfluenceMap public profiles |
| Legal Exposure | 20 | Sabin Center · Columbia Law |

**Band classification:**

| Band | Score | Signal |
|---|---|---|
| BREACH | 0 – 30 | Commitments structurally incompatible with 1.5°C |
| WARNING | 31 – 60 | Material gap between pledge trajectory and verified performance |
| ON TRACK | 61 – 100 | Credible alignment with Paris pathway |

**Current distribution: 5 BREACH · 3 WARNING · 3 ON TRACK**

Full derivation: [`docs/CONSCIENCE-METHODOLOGY.md`](docs/CONSCIENCE-METHODOLOGY.md)

---

## VYRION Index — Daily Planetary Health Score

Pre-industrial 1850–1900 average = 100/100. That was baseline Earth. This is where we are now.

The VYRION Index is not a projection. It is a daily computed measurement — 48 verified indicators across 8 Earth systems, weighted by systemic significance, updated every 24 hours.

| Earth System | Weight | Primary Source |
|---|---|---|
| Atmosphere | 22% | NOAA GML |
| Ocean | 18% | Open-Meteo Marine · OISST |
| Ice | 14% | NSIDC · NASA |
| Forest | 13% | NASA FIRMS · GBIF |
| Biodiversity | 12% | GBIF |
| Freshwater | 10% | USGS |
| Soil | 7% | FAO · ERA5 |
| Corporate Accountability | 4% | CONSCIENCE Engine |

**Formula:** `S_final = Σ(W_i × S_i)`
**Uncertainty:** ±1.8 points propagated. Minimum detectable change: ±0.5.
**Current score:** 36.1 ± 1.8 / 100 · automated · daily computation
**Day 1 score:** 41.3 / 100 · March 18, 2026

The trajectory is the signal. Full methodology: [`docs/VYRION-METHODOLOGY-V1.0.md`](docs/VYRION-METHODOLOGY-V1.0.md)

---

## MODULE 01 — SHIELD
### Disaster Intelligence & Early Warning

Predictive AI system providing 2–14 day early warning for floods, wildfires, cyclones, and drought onset. Free public tier for every nation on Earth.

SHIELD does not wait for disaster to confirm itself. It reads the preconditions — atmospheric pressure gradients, soil moisture deficits, sea surface temperature anomalies, fire weather indices — and issues structured warnings before systems reach critical threshold.

| Hazard | Source | Update Cadence |
|---|---|---|
| Seismic (M4.5+) | USGS Earthquake Hazards | Continuous |
| Wildfire | NASA EONET | Continuous |
| Severe Storm | NASA EONET | Continuous |
| Flood | NASA EONET | Continuous |
| Volcanic | NASA EONET | Continuous |

**Threat Algorithm v1.1:** M4.5–5.4 events excluded as background seismicity.

| Level | Active Events | Signal |
|---|---|---|
| NOMINAL | < 2 | Baseline activity |
| WATCH | 2 – 6 | Elevated observation |
| ELEVATED | 7 – 14 | Systemic pressure present |
| CRITICAL | 15+ | Multi-system stress event |

*Solves: Natural Disasters · Food Security · Climate Resilience*

---

## MODULE 02 — ATLAS
### Real-Time Planetary Intelligence

The nervous system of VYRION. All other modules draw from ATLAS.

AI-powered environmental monitoring network tracking climate variables, air quality, water levels, soil health, and biodiversity indices across the planet in real time. ATLAS is the backbone of the VYRION Index — the computational layer that translates raw Earth observation data into the daily 0–100 planetary health score.

| Earth System | Weight | Primary Source |
|---|---|---|
| Atmosphere | 22% | NOAA GML |
| Ocean | 18% | Open-Meteo Marine · OISST |
| Ice | 14% | NSIDC · NASA |
| Forest | 13% | NASA FIRMS · GBIF |
| Biodiversity | 12% | GBIF |
| Freshwater | 10% | USGS |
| Soil | 7% | FAO · ERA5 |
| Corporate Accountability | 4% | CONSCIENCE Engine |

**Formula:** `S_final = Σ(W_i × S_i)`
**Uncertainty:** ±1.8 points propagated. Minimum detectable change: ±0.5.
**Current score:** 36.1 ± 1.8 / 100 · automated · daily computation
**Day 1 score:** 41.3 / 100 · March 18, 2026

The trajectory is the signal. Full methodology: [`docs/VYRION-METHODOLOGY-V1.0.md`](docs/VYRION-METHODOLOGY-V1.0.md)

*Solves: Climate · Air Pollution · Water · Disasters*

---

## MODULE 03 — ROOT
### Regenerative Agriculture OS

Earth's foundational stability layer.

AI-guided soil restoration, water-efficient farming protocols, and regenerative land management software. ROOT converts multi-source Earth observation data into a verified time-series model of soil stability, agricultural system behavior, land degradation velocity, water–soil interaction, and regenerative land recovery.

Where ATLAS tracks planetary systems at scale, ROOT goes subsurface — measuring the slow-moving collapse and recovery dynamics that underpin food systems, water cycles, and carbon sequestration. Turns degraded land into living carbon sinks.

*Solves: Soil Degradation · Water Scarcity · Food Security*

---

## MODULE 04 — CANOPY
### Reforestation & Habitat Restoration

Satellite-guided precision reforestation at planetary scale.

CANOPY's AI identifies optimal planting sites, species mix, and climate compatibility across degraded land systems globally. Biodiversity monitoring nodes track species recovery over time, creating a verifiable, immutable record of habitat restoration progress.

This is not tree-planting as PR. Every planting decision is driven by verified land condition data, species survival probability modeling, and ecosystem interdependency mapping. The goal is not coverage — it is function. Restored forest that performs as forest.

*Solves: Deforestation · Species Extinction · Carbon Capture*

---

## MODULE 05 — FLUX
### Clean Energy Infrastructure

Modular clean energy deployment platform.

FLUX licenses distributed solar, hydrogen, and atmospheric carbon capture systems to cities and industrial operators — providing the infrastructure layer for verified emissions reduction at scale. Every deployment is tracked, measured, and published against the operator's stated climate commitments.

No commitment is credible without a verified delivery mechanism. FLUX is that mechanism.

*Solves: Climate · Air Pollution · Resource Depletion*

---

## MODULE 06 — TIDE
### Ocean & Water Systems

Scalable remediation and purification for Earth's water systems.

TIDE deploys ocean plastic remediation hardware with AI-optimized routing — directing intervention assets to high-density accumulation zones identified through satellite surface mapping. Atmospheric and filter-based water purification systems address freshwater access at community and municipal scale. Ocean acidification mitigation protocols provide verified chemical intervention data to policy systems.

The ocean is not a dump. It is a system. TIDE treats it as one.

*Solves: Ocean Pollution · Water Scarcity · Marine Biodiversity*

---

## MODULE 07 — LOOP
### Circular Waste Economy Platform

Enterprise and municipal circular economy operating software.

LOOP tracks materials through their entire lifecycle — from extraction through manufacture, use, and end-of-life — and reroutes waste streams into verified manufacturing input channels. Material flows that currently terminate in landfill or incineration become scored, traceable inputs to new production cycles.

Waste is a systems failure. LOOP maps the failure and reroutes the flow.

*Solves: Waste Management · Resource Depletion · Soil Contamination*

---

## MODULE 08 — PULSE
### Impact Economy & Credit Marketplace

The economic engine of planetary restoration.

PULSE operates a tokenized marketplace for verified carbon, biodiversity, water, and soil credits — enabling corporations to meet compliance obligations through investments in verified restoration activity, and enabling governments to monetize ecosystem recovery at scale.

Every credit on PULSE traces to a verified real-world outcome in ATLAS, ROOT, CANOPY, TIDE, or LOOP. No phantom credits. No unverified offsets. The ledger is public. The methodology is open.

*Solves: All 10 Problems · Economic Engine · Global Incentive Layer*

---

## Automation

Two GitHub Actions pipelines run on fixed UTC schedules.

| Workflow | Schedule | Function |
|---|---|---|
| `conscience-daily.yml` | 00:05 UTC daily | Fetches NOAA CO₂, SEC EDGAR (11 companies), Open-Meteo ERA5, World Bank emissions. Updates `conscience-data.json`. |
| `shield-update.yml` | 00:10 + 12:10 UTC | Fetches USGS M4.5+ seismic feed, NASA EONET (wildfire, storm, flood, volcanic). Computes threat level. Updates `data/shield-snapshot.json`. |

SHIELD runs twice daily — seismic and hazard conditions evolve throughout the day.
CONSCIENCE runs once daily — source data (CDP, SBTi, InfluenceMap, EDGAR) does not update intraday.
On fetch failure, both pipelines fall back to the last valid snapshot rather than publishing empty data.

---

## The Record — Weekly Investigative Publication

Published every Wednesday. One company. Full pledge-to-reality audit. Source-cited. Immutable.

The Record is not commentary. It is a structured accountability artifact — a permanent, verifiable comparison of what a tracked company has committed to and what independently verified data shows they have delivered.

| Issue | Company | Published |
|---|---|---|
| 001 | BP | March 18, 2026 |
| 002 | ExxonMobil | March 25, 2026 |
| 003 | Shell | April 1, 2026 |
| 004 | Delta Air Lines | April 8, 2026 |
| 005 | Starbucks | April 15, 2026 |
| 006 | Walmart | April 22, 2026 |
| 007 | Meta | April 29, 2026 |
| 008 | Apple | May 6, 2026 |
| 009 | Microsoft | May 13, 2026 |
| 010 | Amazon | May 20, 2026 |

Records are never overwritten. Corrections are published as appended entries with preserved timestamps.

---

## Data Sources

Every output traces to a public, auditable source. No proprietary data enters any scoring pipeline.

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

**Verifiability first.**
Every output traces to a public, auditable source. Source links are embedded at the point of claim. No assertion is made without a traceable origin.

**No hidden modeling.**
All transformations are explicit and reproducible. Full methodology is published in `docs/`. The formula is the score. The score is the formula.

**Immutable publication.**
Published records are never overwritten — only appended with corrections. Timestamps are preserved. The ledger does not revise history.

**Open Proof Protocol.**
Errors reported to contact@vyrion.earth are reviewed and published as corrections within 24 hours. The methodology is open. The ledger is public.

**Radical transparency.**
Corporate accountability cannot be selective. We apply the same standard to our own methodology that we apply to the companies we score.

---

## Legal Structure

VYRION PBC is a Public Benefit Corporation — a subsidiary of The Nexan Institute.

No financial relationship exists with any scored company. Scoring is derived entirely from public data sources. CONSCIENCE scores are informational outputs, not investment recommendations.

Disclaimers: [`docs/INVESTABLE-DISCLAIMER.md`](docs/INVESTABLE-DISCLAIMER.md)

---

## Contact

**Tyler Frost / DablerFrost**
Founder — VYRION PBC · The Nexan Institute
Hilo, Hawaii

contact@vyrion.earth
[x.com/DablerFrost](https://x.com/DablerFrost)
[vyrion.earth](https://www.vyrion.earth)

> Find the error. We will publish the correction.

---

*The planet has a score. The numbers remain the numbers. Strategy must meet science.*