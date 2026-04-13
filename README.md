[README (1).md](https://github.com/user-attachments/files/26483400/README.1.md)
# VYRION CONSCIENCE
## Corporate Climate Pledge Verification · v2.8 · April 2026

Live links: vyrion.earth · atlas.html · shield.html
Methodology link: methodology/VYRION-METHODOLOGY-v1.0.md
Contact: contact@vyrion.earth 
**Data feed viewer:** [dablerfrost.github.io/conscience/conscience-data.html](https://dablerfrost.github.io/conscience/conscience-data.html)  
**Raw JSON:** [dablerfrost.github.io/conscience/conscience-data.json](https://dablerfrost.github.io/conscience/conscience-data.json)

> Not activism. Not a nonprofit. Accountability infrastructure.

---

## What This Is

CONSCIENCE measures the gap between what major corporations promise on climate and what the data shows they're actually doing. Every score is source-cited. Every source is linked. Every error is published as a correction within 24 hours.

This is not a coverage product. ISS ESG covers 10,000+ companies. MSCI covers 16,000+. They measure what companies report. CONSCIENCE measures what companies do — pledge vs. verified reality, publicly auditable, with corrections published as they happen.

**Live platform features (v2.8):**
- 11 companies scored against Paris Agreement 1.5°C pathways
- Signal Intelligence Feed — real-time risk signals from EDGAR 8-K density, SBTi status, lobbying grades, legal exposure
- Change Detection — shows what changed since your last visit
- Audit Pack per company — one-click source bundle for analysts, journalists, and funds
- Regulatory Filing Watch — live SEC EDGAR dates for all 11 companies
- Portfolio Stress Tester — aggregate CONSCIENCE score and band distribution for any portfolio
- Data Cadence Disclosure — full transparency on 48 VYRION Index indicator update frequencies
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
- **Formula:** S_final = Σ(W_i × S_i)
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

- **CDP** — cdp.net/en/responses · Annual corporate climate disclosures
- **InfluenceMap** — influencemap.org · Corporate lobbying grades (continuous)
- **Sabin Center** — climatecasechart.com · Columbia Law School
- **SBTi Registry** — sciencebasedtargets.org
- **SEC EDGAR** — data.sec.gov/submissions · Live CORS-open public API
- **TPI** — transitionpathwayinitiative.org
- **NOAA GML** — gml.noaa.gov/ccgg/trends · CO₂ daily
- **NSIDC** — nsidc.org · Arctic sea ice daily
- **NASA EONET** — eonet.gsfc.nasa.gov · Natural hazard events
- **USGS** — earthquake.usgs.gov · Seismic feed

---

## Data Feed

Human-readable viewer: [dablerfrost.github.io/conscience/conscience-data.html](https://dablerfrost.github.io/conscience/conscience-data.html)

Raw JSON: [dablerfrost.github.io/conscience/conscience-data.json](https://dablerfrost.github.io/conscience/conscience-data.json)

Contains all 11 companies · scores · bands · factor breakdowns · source URLs · EDGAR CIK links · aggregate statistics · VYRION Index metadata.

Data licensing: [contact@vyrion.earth](mailto:contact@vyrion.earth)

---

## Open Proof Protocol

Find an error → [contact@vyrion.earth](mailto:contact@vyrion.earth). Corrections published within 24 hours as permanent, timestamped changelog entries. No original entries ever deleted.

---

## Repository Structure

```
conscience/
│
├── .github/
│   └── workflows/
│       ├── conscience-daily.yml      — Automated daily data pipeline
│       └── shield-update.yml         — SHIELD refresh (00:00 + 12:00 UTC)
│
├── VYRION/                           — Architecture and planning documents
│   └── [8 architecture .md files]
│
├── archive/                          — Daily VYRION Index archive
│   ├── index.html                    — Archive page
│   └── [daily YYYY-MM-DD.md entries]
│
├── record/                           — The Record — weekly company deep-dives
│   ├── issue-001-bp.html             — Issue 001: BP (March 18)
│   └── issue-002-exxonmobil.html     — Issue 002: ExxonMobil (March 25)
│
├── scripts/                          — GitHub Actions automation scripts
│   ├── fetch-conscience-data.js      — Pulls NOAA, EDGAR, Open-Meteo, World Bank
│   └── fetch-shield-data.js          — Pulls USGS, NASA EONET for SHIELD
│
├── CONSCIENCE-METHODOLOGY.md         — Per-company score derivation (all 11)
├── README.md                         — This file
├── VYRION-INDEX.md                   — VYRION Index documentation
├── VYRION-MASTER.md                  — Master architecture reference
├── VYRION-METHODOLOGY-v1.0.md        — Full 48-indicator methodology paper
│
├── conscience-data.html              — Human-readable data feed viewer
├── conscience-data.json              — Machine-readable score data (raw JSON)
├── index.html                        — Live CONSCIENCE platform (v2.8)
└── shield.html                       — VYRION SHIELD early warning module
```

---

## The Record — Publication Schedule

| Issue | Company | Published | File |
|-------|---------|-----------|------|
| 001 | BP | March 18, 2026 | record/issue-001-bp.html |
| 002 | ExxonMobil | March 25, 2026 | record/issue-002-exxonmobil.html |
| 003 | Shell | April 1, 2026 | record/issue-003-shell.html |
| 004 | Delta Air Lines | April 8, 2026 | record/issue-004-delta.html |

---

## Automation

**conscience-daily.yml** — Daily data refresh: NOAA GML (CO₂), SEC EDGAR, Open-Meteo ERA5, World Bank. Feeds the VYRION Index pipeline.

**shield-update.yml** — Runs 00:00 + 12:00 UTC. Fetches USGS seismic, NASA EONET (wildfire/storm/flood/volcanic), outputs to `data/shield-snapshot.json`.

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-03-18 | v1.0 | Initial scores — 11 companies established |
| 2026-03-20 | — | Arctic correction published · VYRION-METHODOLOGY-v1.0.md timestamped |
| 2026-03-25 | — | The Record Issue 002: ExxonMobil |
| 2026-03-30 | v2.7 | Investor Terminal · VYRION Stack · Boundary Breakers · Stress Tester · Licensing CTA |
| 2026-04-01 | — | The Record Issue 003: Shell |
| 2026-04-03 | v2.8 | Signal Intelligence · Change Detection · Audit Pack · Filing Watch · Cadence table · Data viewer · README |

---

## Entity

**VYRION PBC** — Planetary accountability infrastructure  
**The Nexan Institute** — Parent entity  
**Founder:** Tyler Frost / DablerFrost · Hilo, Hawaii  
**Contact:** [contact@vyrion.earth](mailto:contact@vyrion.earth)  
**X / Instagram:** @DablerFrost

> The planet has a score. Now it has a daily number.
