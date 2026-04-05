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

---

## Planned — v1.1 (Target: Month 3–6)

- System Interaction Matrix: cascade and feedback coefficients between the 8 planetary systems
- Weighting Rationale appendix: full derivation citing Steffen et al. (2015) and Richardson et al. (2023)
- Indicator Substitution Protocol: fallback indicators when primary data sources are unavailable
- Data Freshness Table: real-time display of last-updated timestamp per indicator
- Regional disaggregation: sub-global VYRION scores for major geographic zones

---

*CHANGELOG.md · VYRION PBC · Tyler Frost / DablerFrost · Hilo, Hawaii*
*github.com/dablerfrost/conscience · contact@vyrion.earth*
