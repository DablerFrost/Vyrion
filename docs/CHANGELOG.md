# VYRION Methodology Changelog

All changes to scoring logic, indicator definitions, system weights, baseline values, platform versions, and corrections are logged here permanently. No entries are ever deleted. Corrections are additive and timestamped.

**Open Proof Protocol:** Find an error — contact@vyrion.earth. Correction published within 24 hours.

---

## v2.8 — April 3, 2026

**Type:** Platform release
**Scope:** CONSCIENCE platform — no score values changed

### Platform changes
- Signal Intelligence Feed: real-time risk signals computed from EDGAR 8-K density, SBTi status, lobbying grades, and legal exposure thresholds
- Change Detection system: comparison of live data against stored state from previous visit (CO₂, EDGAR 8-K events, annual filing dates)
- Audit Pack per company: one-click source bundle for analysts, journalists, and funds — generates complete derivation, source citations, and versioned score history
- Regulatory Filing Watch: live SEC EDGAR annual filing dates and 8-K event counts for all 11 tracked companies
- Data Cadence Disclosure table: full transparency on update frequencies for all 48 VYRION Index indicators
- Pledge Gap ticker: −34.6 aggregate gap metric added to live banner
- conscience-data.html: human-readable data feed viewer with static embedded data and silent live JSON fetch
- conscience-data.json: machine-readable score feed published with full factor breakdowns and metadata

---

## v2.7 — March 30, 2026

**Type:** Platform release
**Scope:** CONSCIENCE platform — no score values changed

### Platform changes
- Investor Terminal layer added
- VYRION Stack — four-layer architecture visualization
- Boundary Breakers / Boundary Regenerators board
- Portfolio Stress Tester: aggregate CONSCIENCE score and band distribution for any subset of the portfolio
- Data Licensing CTA: institutional tier structure published ($500–$25,000/mo)
- Changelog section added to live platform

---

## v1.0 — March 18, 2026 (METHODOLOGY LOCK)

**Type:** Initial release — LOCKED
**Scope:** VYRION Index methodology and CONSCIENCE v1.0 baseline

### VYRION Index — established
- Pre-industrial baseline defined: 1850–1900 average = 100/100
- Eight systems defined with weights: Atmosphere 22%, Ocean 18%, Ice 14%, Forest 13%, Biodiversity 12%, Freshwater 10%, Soil 7%, Corporate Accountability 4%
- 48 indicators defined: 6 per system
- Master formula established: S_final = Σ(W_i × S_i) where S_i = max(0, min(100, f(indicator_i, baseline_i)))
- Uncertainty model established: ±1.8 points RSS propagated. Minimum detectable change: ±0.5 points.
- Day 1 score published: 41.3 ± 1.8 / 100 — March 18, 2026
- Open Proof Protocol established: errors reported to contact@vyrion.earth, corrections published within 24 hours

### CONSCIENCE — v1.0 baseline scores established
- 11 companies scored: ExxonMobil 8 · BP 11 · Delta 14 · Shell 19 · Starbucks 29 · Walmart 38 · Meta 43 · Amazon 47 · Microsoft 61 · Unilever 72 · Apple 84
- Four scoring factors: Pledge Quality (30), CDP Performance (25), Lobbying Alignment (25), Legal Exposure (20)
- Band thresholds: Breach 0–30 · Warning 31–60 · On Track 61–100
- Basis: Paris Agreement 1.5°C pathways · Science Based Targets initiative criteria
- All scores sourced from: CDP 2023 public responses, InfluenceMap public profiles, Sabin Center litigation database, SBTi public registry, SEC EDGAR submissions API

### Prior art
- VYRION-METHODOLOGY-v1.0.md uploaded to GitHub: March 20, 2026
- GitHub timestamp constitutes prior art record for methodology definitions and indicator framework

---

## Correction Log

### March 20, 2026 — Arctic Sea Ice Correction

**Original post (March 19, Day 2):** Stated Arctic sea ice at 14.22M km² was a "new daily low"
**Correct statement:** 14.22M km² represents the 2026 annual maximum — one of the lowest March peaks in 47 years of satellite records. Sea ice minimums occur in September, not March.
**Source:** NSIDC — nsidc.org/arcticseaicenews/
**Correction posted:** March 20, 2026, as public reply to original post on X
**Score impact:** None — the value and its significance were correctly computed. The error was in the descriptive language (minimum vs maximum), not the number.

### October 23, 2026 — Day 1 CO₂ Source Value Correction

**Original value (March 18, 2026, Day 1 readings):** Atmospheric CO₂ recorded as 424.9 ppm
**Correct value:** 430.15 ppm — the NOAA Mauna Loa monthly mean for March 2026. The 424.9 ppm figure corresponds to roughly February–March 2024.
**Source:** NOAA Global Monitoring Laboratory — https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.txt
**Correction posted:** October 23, 2026, as part of the v1.1 baseline reconstruction
**Score impact:** Under the v1.0 A1 function, the corrected value scores A1 at 11.7 instead of 14.8 — composite impact −0.1 points in the reconstruction (the stale value flattered the score). The originally published Day 1 and Day 2 scores (41.3 / 41.2) are not altered; they stand as published. This correction applies to the source value and to the v1.1 restated baseline (data/index-baseline.json).

### October 23, 2026 — Arctic Sea Ice March Maximum Value Correction

**Original value (March 19, 2026, Day 2; repeated in the March 20, 2026 correction above):** 2026 Arctic sea ice annual maximum stated as 14.22M km²
**Correct value:** 14.29M km² — NSIDC's announced 2026 annual maximum, reached March 15, 2026; the lowest annual maximum in the 48-year satellite record (tied with 2025), 1.36M km² below the 1981–2010 average maximum of 15.65M km²
**Source:** NSIDC — https://nsidc.org/news-analyses/news-stories/arctic-sea-ice-record-low-maximum-strikes-again
**Correction posted:** October 23, 2026, as part of the v1.1 baseline reconstruction
**Score impact:** The March 20, 2026 entry above is not edited — its descriptive-language correction (maximum, not minimum) stands; this entry corrects the value that entry repeated, per the additive protocol. In the v1.1 baseline, C1 is computed from the corrected value (C1 = 93.0).

---

## Planned — v1.1 (Target: Month 3–6)

- System Interaction Matrix: cascade and feedback coefficients between the 8 planetary systems
- Weighting Rationale appendix: full derivation citing Steffen et al. (2015) and Richardson et al. (2023)
- Indicator Substitution Protocol: fallback indicators when primary data sources are unavailable
- Data Freshness Table: real-time display of last-updated timestamp per indicator
- Regional disaggregation: sub-global VYRION scores for major geographic zones

---

*CHANGELOG.md · VYRION LLC · Tyler Frost / DablerFrost · Hilo, Hawaii*
*github.com/dablerfrost/conscience · contact@vyrion.earth*
