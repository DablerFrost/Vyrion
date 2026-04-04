[README.md](https://github.com/user-attachments/files/26479068/README.md)
# VYRION CONSCIENCE
## Corporate Climate Pledge Verification · v2.8 · April 2026

**Live platform:** [dablerfrost.github.io/conscience](https://dablerfrost.github.io/conscience)

> Not activism. Not a nonprofit. Accountability infrastructure.

---

## What This Is

CONSCIENCE measures the gap between what major corporations promise on climate and what the data shows they're actually doing. Every score is source-cited. Every source is linked. Every error is published as a correction within 24 hours.

This is not a coverage product. ISS ESG covers 10,000+ companies. MSCI covers 16,000+. They measure what companies report. CONSCIENCE measures what companies do — pledge vs. verified reality, publicly auditable, with corrections published as they happen.

**Live platform features (v2.8):**
- 11 companies scored against Paris Agreement 1.5°C pathways
- Signal Intelligence Feed — real-time risk signals from EDGAR 8-K density, SBTi status, lobbying grades, legal exposure
- Change Detection — shows what changed since your last visit (CO₂, 8-K events, new annual filings)
- Audit Pack per company — one-click source bundle for analysts, journalists, and funds
- Regulatory Filing Watch — live SEC EDGAR dates for all 11 companies
- Portfolio Stress Tester — aggregate CONSCIENCE score and band distribution for any portfolio
- Data Cadence Disclosure — full transparency on which of the 48 VYRION Index indicators update daily vs. monthly vs. annually
- VYRION Index live ticker — daily 0–100 planetary health benchmark

---

## Scoring Methodology

Scores use a 0–100 scale from four weighted public data sources:

| Factor | Max | Source | Method |
|--------|-----|--------|--------|
| Pledge Quality | 30 | Company filings · SBTi registry | Ambition, scope coverage (1/2/3), deadline, third-party validation |
| CDP Performance | 25 | CDP 2023 public responses | A=25 · B=18 · C=10 · D=4 |
| Lobbying Alignment | 25 | InfluenceMap profiles | A+=25 → F=0; negative for obstruction |
| Legal Exposure | 20 | Sabin Center litigation DB | Base 20 − (0.5 × active cases); floor 0 |

**Band thresholds:** Breach 0–30 · Warning 31–60 · On Track 61–100

Full derivation per company: [CONSCIENCE-METHODOLOGY.md](CONSCIENCE-METHODOLOGY.md)

---

## Current Scores · v1.0 · March 18, 2026

| Company | Score | Band | CDP | InfluenceMap | SBTi | Active Cases |
|---------|-------|------|-----|--------------|------|--------------|
| ExxonMobil | 8 | BREACH | D | F | Not committed | 27 |
| BP | 11 | BREACH | C | D- | Not committed | 12 |
| Delta Air Lines | 14 | BREACH | C | D | Not committed | 3 |
| Shell | 19 | BREACH | C | D | Not committed | 19 |
| Starbucks | 29 | BREACH | B | C | Committed | 1 |
| Walmart | 38 | WARNING | B | C | Approved (ops) | 2 |
| Meta | 43 | WARNING | B | C- | Committed | 1 |
| Amazon | 47 | WARNING | B | C | Committed | 3 |
| Microsoft | 61 | ON TRACK | A- | B- | Approved 1.5°C | 1 |
| Unilever | 72 | ON TRACK | A- | B | Approved 1.5°C | 1 |
| Apple | 84 | ON TRACK | A | B+ | Approved 1.5°C | 0 |

**Aggregate:** Mean score 38.6/100 · Pledge gap −34.6 · 97 active climate lawsuits across portfolio

---

## VYRION Index

The world's first daily investable planetary health benchmark.

- **Current score:** 41.2 ± 1.8 / 100
- **Baseline:** Pre-industrial 1850–1900 = 100/100
- **Formula:** Deviation-from-Baseline Weighted Composite — S_final = Σ(W_i × S_i)
- **Indicators:** 48 across 8 Earth systems
- **Uncertainty:** ±1.8 points propagated · Minimum detectable change: ±0.5

| System | Weight | Cadence |
|--------|--------|---------|
| Atmosphere | 22% | Daily (NOAA GML CO₂) |
| Ocean | 18% | Daily (NOAA OISST SST) |
| Ice / Cryosphere | 14% | Daily (NSIDC Arctic extent) |
| Forest | 13% | Monthly refresh |
| Biodiversity | 12% | Monthly refresh |
| Freshwater | 10% | Daily (SPEI drought index) |
| Soil | 7% | Monthly refresh |
| Corporate Accountability | 4% | Daily (SEC EDGAR 8-K) |

Full methodology: [VYRION-METHODOLOGY-v1.0.md](VYRION-METHODOLOGY-v1.0.md) · Prior art timestamped March 20, 2026

---

## Data Sources

All sources are public-domain or open-license:

- **CDP** — cdp.net/en/responses · Annual corporate climate disclosures
- **InfluenceMap** — influencemap.org · Corporate lobbying grades (continuous)
- **Sabin Center for Climate Change Law** — climatecasechart.com · Columbia Law School
- **SBTi Registry** — sciencebasedtargets.org · Science Based Targets initiative
- **SEC EDGAR** — data.sec.gov/submissions · Live via CORS-open public API
- **TPI** — transitionpathwayinitiative.org · Transition Pathway Initiative
- **NOAA GML** — gml.noaa.gov/ccgg/trends · Atmospheric CO₂ daily
- **NSIDC** — nsidc.org · Arctic sea ice extent daily
- **NASA EONET** — eonet.gsfc.nasa.gov · Active natural hazard events
- **USGS** — earthquake.usgs.gov · Seismic event feed

---

## Data Feed

Machine-readable scores available at:
[dablerfrost.github.io/conscience/conscience-data.json](https://dablerfrost.github.io/conscience/conscience-data.json)

Contains: all 11 companies · scores · bands · factor breakdowns · source URLs · EDGAR CIK links · aggregate statistics · VYRION Index metadata.

Data licensing for institutional use: [contact@vyrion.earth](mailto:contact@vyrion.earth)

---

## Open Proof Protocol

Find an error in any score, source citation, or data point — report it to [contact@vyrion.earth](mailto:contact@vyrion.earth). VYRION publishes corrections within 24 hours as a permanent, timestamped entry in the Score Changelog on the live platform. No original entries are ever deleted. Corrections are additive and public.

This is the accountability standard VYRION applies to itself.

---

## Repository Structure

```
conscience/
├── index.html                    — Live CONSCIENCE platform (v2.8)
├── shield.html                   — VYRION SHIELD disaster early warning module
├── archive/
│   └── index.html               — Daily VYRION Index archive
├── conscience-data.json          — Machine-readable score data feed
├── CONSCIENCE-METHODOLOGY.md     — Per-company score derivation
├── VYRION-METHODOLOGY-v1.0.md    — Full 48-indicator methodology paper
├── VYRION-INDEX.md               — Index documentation
├── VYRION-MASTER.md              — Master architecture reference
└── README.md                     — This file
```

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-03-18 | v1.0 | Initial scores — 11 companies · CONSCIENCE baseline established |
| 2026-03-20 | — | Correction: Arctic Day 2 post corrected (March = annual maximum, not minimum) |
| 2026-03-20 | — | VYRION-METHODOLOGY-v1.0.md uploaded — prior art timestamped |
| 2026-03-30 | v2.7 | Investor Terminal layer · VYRION Stack · Boundary Breakers board · Portfolio Stress Tester · Data Licensing CTA |
| 2026-04-03 | v2.8 | Signal Intelligence Feed · Change Detection · Audit Pack · Filing Watch · Data Cadence table · conscience-data.json · README rewrite |

---

## Entity

**VYRION PBC** — Planetary accountability infrastructure  
**The Nexan Institute** — Parent entity · AI-human alignment  
**Founder:** Tyler Frost / DablerFrost · Hilo, Hawaii  
**Contact:** [contact@vyrion.earth](mailto:contact@vyrion.earth)  
**Platform:** [dablerfrost.github.io/conscience](https://dablerfrost.github.io/conscience)  
**X / Instagram:** @DablerFrost

> The planet has a score. Now it has a daily number.
