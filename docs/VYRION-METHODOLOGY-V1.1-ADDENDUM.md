# VYRION Index — Methodology Addendum v1.1

**Status:** Adopted — October 23, 2026
**Relationship to v1.0:** This addendum *references and amends* `VYRION-METHODOLOGY-V1.0.md`; it does not replace or edit it. The v1.0 document remains locked as published (prior art, March 20, 2026). Per v1.0's own rule — "no changes to scoring logic, indicator definitions, weights, or baseline without a version increment" — every change below is a v1.1 change, logged here and in `CHANGELOG.md`.

**Companion files:** `data/index-baseline.json` (the v1.1 restated baseline, fully reproducible from this addendum) · `data/index-history.json` (the score series) · `docs/RESTATEMENT-NOTE-V1.1.md` (the public explanation).

---

## 1. What v1.1 changes — and what it does not

**Changed:**
1. Per-indicator **thresholds** are specified for all indicators (§2). v1.0 specified a threshold for exactly one indicator (A1); the rest are adopted here from the Phase 1 reconstruction's proposals.
2. Per-system **measurement uncertainties (σ)** are published (§3), making the ±1.8 figure reproducible for the first time.
3. One indicator is **added**: C1b, Arctic sea ice September minimum (§4). The Index now has **49 indicators**.
4. The eight indicators that could not be retrieved as defined are **substituted** for future cycles (§5). In the v1.1.0 baseline they remain excluded, exactly as the missing-data protocol requires.
5. **CA6 is differentiated from CA2** (§6), ending a double-count present in the v1.0-era dataset.
6. **Uncertainty reporting** now publishes measurement and model components separately, plus their combined total (§7).
7. Four **baseline substitutions** buried in the v1.0 definitions are disclosed (§8).
8. Two source values in the March 2026 record are **corrected** (Day 1 CO₂ 424.9 → 430.15 ppm; 2026 Arctic March maximum 14.22 → 14.29M km²) — see `CHANGELOG.md`, Correction Log, October 23, 2026.

**Not changed:** the eight systems and their weights (22 / 18 / 14 / 13 / 12 / 10 / 7 / 4); the master formula S_final = Σ(Wᵢ × Sᵢ); the 0–100 bounding rule; the pre-industrial baseline concept; the missing-data protocol; the originally published March 2026 scores (41.3 and 41.2), which stand in the historical record untouched.

**Aggregation rule, now codified:** a system score is the **mean of its scored indicators** (equal weighting within systems — v1.0 never specified within-system weights). Indicators excluded under the missing-data protocol do not enter the mean, and their exclusion is published.

---

## 2. Threshold table — all 49 indicators

Form key: **G** = the v1.0 general function, S = max(0, min(100, 100 × (1 − |value − baseline| / threshold))). **D** = direct (the general function with baseline and threshold both 100, or an index × 100 — the score is the quantity itself). **ALT** = documented alternative form, defined in the note column. "Threshold" is the deviation from baseline at which the indicator scores 0. Every threshold except A1's is a **PROPOSAL adopted by v1.1** (they were unspecified in v1.0); each rationale is recorded in `data/index-baseline.json` per indicator.

| ID | Indicator | Baseline | Threshold | Form |
|---|---|---|---|---|
| A1 | Atmospheric CO₂ concentration | 280 ppm | 170 ppm (→450 ppm) — *specified in v1.0* | G |
| A2 | Global mean surface temperature anomaly | 0.0 °C | 2.0 °C (Paris upper guardrail) | G |
| A3 | Atmospheric methane concentration | ~722 ppb | 2,400 ppb | G |
| A4 | Atmospheric nitrous oxide concentration | ~270 ppb | 130 ppb | G |
| A5 | Radiative forcing — total | 0.0 W/m² | 3.5 W/m² | G |
| A6 | Stratospheric ozone column | ~300 DU | 100 DU | G |
| O1 | Global mean SST anomaly | 0.0 °C | 2.0 °C | G |
| O2 | Ocean heat content 0–700 m | 0 anomaly (proxy — §8) | 400 ZJ | G |
| O3 | Ocean pH | ~8.18 | 0.30 pH units | G |
| O4 | Global mean sea level anomaly | 0 mm | 500 mm | G |
| O5 | AMOC strength | ~19 Sv | 10 Sv weakening | G |
| O6 | Coral reef bleaching extent | <1% (1 used) | 99 points (→100%) | G |
| C1 | Arctic sea ice extent — March maximum | ~14.5M km² | 3.0M km² loss | G |
| C1b | Arctic sea ice extent — September minimum | ~7.5M km² | 7.5M km² (complete loss) | G |
| C2 | Antarctic sea ice extent (annual minimum) | ~2.90M km² (estimated — §8) | 2.90M km² (complete loss) | G |
| C3 | Greenland ice sheet mass balance | ~0 Gt/yr | 1,000 Gt/yr loss | G |
| C4 | Antarctic ice sheet mass balance | ~0 Gt/yr | 1,000 Gt/yr loss | G |
| C5 | Global glacier mass balance | ~0 mm w.e./yr | 1,500 mm w.e./yr loss | G |
| C6 | Arctic sea ice thickness | ~3.5 m | 3.5 m (total loss) | G |
| F1 | Global tree cover loss | ~2.5 Mha/yr | 30 Mha/yr deviation | G |
| F2 | Tropical primary forest loss | ~0 Mha/yr | 10 Mha/yr | G |
| F3 | Active wildfire event count | Historical frequency | — *not retrievable; substituted §5* | — |
| F4 | Global forest carbon stock anomaly | Pre-industrial stock (anomaly 0) | 400 GtC loss | G |
| F5 | Primary forest cover remaining | 100% | 100 points | D |
| F6 | Forest regrowth rate | Natural regeneration (unspecified) | — *ratio form* | ALT: score = expansion ÷ deforestation × 100 |
| B1 | Living Planet Index | 1.0 (1970 anchor — §8) | 1.0 | D (index × 100) |
| B2 | Species extinction rate | ~0.5 E/MSY | — *log form* | ALT: S = 100 × (1 − log₁₀(rate ÷ background) / 4); zero at 10⁴ × background |
| B3 | Biodiversity Intactness Index | ~100% | 100 points | D |
| B4 | Marine protected area coverage | n/a (construct — see note) | — *target form* | ALT: score = coverage ÷ 30% (Kunming–Montreal 30×30) × 100 |
| B5 | GBIF occurrence record density anomaly | — | — *ill-defined; replaced §5* | — |
| B6 | Insect biomass index (proxy) | Pre-1970 = 100 | 100 points | D (% remaining) |
| W1 | Global drought index — SPEI | 0.0 anomaly | — *not retrievable; substituted §5* | — |
| W2 | Groundwater storage anomaly (as depletion rate) | Pre-depletion ≈ 0 net rate (§8) | 500 km³/yr | G |
| W3 | Freshwater withdrawal % of renewable supply | 5% (adopted v1.1) | 45 points (→50%) | G |
| W4 | River flow anomaly — major basins | 0% anomaly | — *not retrievable; substituted §5* | — |
| W5 | Lake water level anomaly | 0% below baseline | 100 points | G |
| W6 | Transboundary water stress index | — | — *never published; replaced §5* | — |
| S1 | Global soil organic carbon stock | Pre-agricultural stock (loss 0) | 400 GtC loss | G |
| S2 | Land degradation index | ~0% anthropogenic | 100 points | G |
| S3 | Desertification proxy — arid-zone NDVI anomaly | Stable vegetation index | — *not retrievable; substituted §5* | — |
| S4 | Soil erosion rate | ~12 Gt/yr natural | 48 Gt/yr deviation | G |
| S5 | Topsoil depth loss rate | ~0% | — *not retrievable; substituted §5* | — |
| S6 | Nitrogen deposition anomaly | ~1.5 kg N/ha/yr | 20 kg N/ha/yr deviation | G |
| CA1 | CDP disclosure quality (portfolio mean) | A-list standard (100) | 100 points | D (mapped grades: A=100, D=0, linear) |
| CA2 | SBTi 1.5 °C approval rate | 100% approved | 100 points | D |
| CA3 | Active climate litigation (portfolio total) | Zero cases | 200 cases | G |
| CA4 | Lobbying alignment (portfolio mean) | A+ standard (100) | 100 points | D (mapped grades: F=0, A+=100, equal steps) |
| CA5 | SEC 8-K event density | Stable baseline | — *not retrievable for Mar 2026; computed §5* | — |
| CA6 | Emissions trajectory alignment (% on 1.5 °C path) | 100% aligned | 100 points | D — *redefined §6 from next cycle* |

---

## 3. Measurement uncertainty — the σ table

v1.0 reported ±1.8 (1σ) without publishing its components. v1.1 publishes them. Each σᵢ is the system-level measurement uncertainty on the 0–100 scale, set by instrument precision and inter-product spread — **not** fitted to reproduce 1.8 (the two best-measured systems receive the smallest σ on independent grounds).

| System | σᵢ | Basis |
|---|---|---|
| Atmosphere | 2.5 | GHG metrology is sub-1%; spread dominated by A5's ERF range and A6's vintage |
| Ocean | 4.0 | OHC inter-product spread, SST product spread, AMOC interannual noise, pH synthesis spread |
| Cryosphere | 5.0 | Extent metrology is excellent, but mass-balance products disagree by ±60–80 Gt/yr, thickness by ±0.2 m, and C2's baseline is itself an estimate |
| Forest | 6.0 | GFW loss estimates carry ±10–15% revision ranges; F4's stock anomaly ±60 GtC; F5's 1850 denominator ±0.7 Bha |
| Biodiversity | 7.0 | LPI confidence intervals are wide; B2 spans an order of magnitude; B3 is two decades stale; two indicators are regional proxies |
| Freshwater | 7.0 | Representativeness: half the system's v1.0 indicators could not be scored at all in the baseline; W2's rate range alone swings the system ±3 points |
| Soil | 7.0 | S1's loss estimate spans ~100–160 GtC across studies; S4 is a model with wide regional spread |
| Corporate Accountability | 3.0 | Inputs are exact counts from a fixed dataset; residual uncertainty is mapping-grid choice (counted under model uncertainty, §7, not here) |

**Propagation (v1.0 formula, unchanged):**
σ_total = √(Σ(Wᵢ² σᵢ²)) = √(0.3025 + 0.5184 + 0.4900 + 0.6084 + 0.7056 + 0.4900 + 0.2401 + 0.0144) = √3.3694 = **1.84**, reported as **±1.8**.

The published ±1.8 therefore reproduces honestly — as the *measurement* component. It was never the total uncertainty. See §7.

---

## 4. New indicator — C1b, Arctic sea ice September minimum

**Adopted from the reconstruction draft's recommendation #1.** v1.0 anchored the Cryosphere's sea-ice signal to C1, the March *maximum* — the slowest-moving cryosphere metric in existence (winter extent is refilled by darkness and cold every year and has declined only ~2.5%/decade), while September extent and ice volume tell a far worse story. Rather than silently re-anchor C1 (which would rewrite a locked definition), v1.1 **adds** C1b alongside it:

- **Definition:** Arctic sea ice extent at its annual (September) minimum, NSIDC Sea Ice Index.
- **Baseline:** ~7.5M km² (the methodology's own September-minimum pre-industrial estimate, already printed in v1.0's C1 row).
- **Threshold:** deviation 7.5M km² (complete loss of the summer minimum → score 0), general function.
- **First value (baseline cycle):** **4.60M km²**, reached September 10, 2025 — tenth lowest in the satellite record (tied with 2008 and 2010). Source: NSIDC, https://nsidc.org/news-analyses/news-stories/arctic-sea-ice-has-reached-minimum-extent-2025 — **VERIFIED**.
- **Score:** 100 × (1 − |4.60 − 7.5| / 7.5) = **61.3**.
- **Effect:** Cryosphere becomes a 7-indicator system and its baseline score moves 77.7 → **75.4**; the composite moves 49.5 → **49.2**. C1 is unchanged (14.29M km², score 93.0).

---

## 5. Substitutions for the eight non-retrievable indicators

In the v1.1.0 baseline these eight are **excluded** (score: null), per the missing-data protocol. The substitutions below are adopted now and take effect from the **next scoring cycle**, so no baseline value changes retroactively. Each substitution is a definition change under v1.1 and is labeled accordingly.

| ID | Why the v1.0 definition fails | v1.1 substitution (adopted) |
|---|---|---|
| **F3** | NASA EONET is a live feed; no published archive of daily counts exists to score a past month against | **F3-R — FIRMS archived fire activity:** mean daily active-fire detections (MODIS + VIIRS, NASA FIRMS archive) over the 30 days centred on the scoring date. Baseline = the same 30-day window averaged over 2012–2025; threshold = +100% deviation (double the reference activity → 0). The computation and its inputs are published with each cycle. Cadence: monthly. |
| **B5** | Ill-defined, not merely missing: GBIF occurrence counts grow with digitization and observer effort; no "density anomaly" product exists, and raw counts would score a *healthier* planet the more phones people buy | **B5-R — Red List Index (IUCN / BirdLife International):** the global Red List Index across comprehensively assessed groups. Baseline 1.0; score = RLI × 100 (direct form, as B1). First value to be taken from the current IUCN/BirdLife release at the next cycle. Cadence: annual. |
| **W1** | The SPEI database is gridded; no published single "global SPEI" value exists | **W1-R — Computed global SPEI mean:** area-weighted (cosine-of-latitude) mean of the SPEIbase gridded SPEI-12 over ice-free land for the scoring month, computed by VYRION from the published grid (SPEI Global Drought Monitor, spei.csic.es), with the computation published alongside the score. Baseline 0.0 (SPEI is standardized against its own reference climatology — a documented substitution of the same class as O2's, §8). Threshold PROPOSAL: deviation 1.5 (global land-mean SPEI-12 interannual variability is ~±0.3, so 1.5 is ~5× experienced variability). Cadence: monthly. |
| **W4** | No global river-flow anomaly percentage is published; WMO reports basin categories qualitatively | **W4-R — WMO basin-category aggregate:** from the WMO *State of Global Water Resources* annual report, take the published share of assessed basins in below-normal or much-below-normal flow. Score = 100 × (1 − (share − 0.40) / 0.60), bounded — i.e. baseline share 0.40 (the long-run expectation under a stationary climate, two of WMO's five categories) and threshold share 1.00. Cadence: annual. |
| **W6** | The named construct has never existed: the Pacific Institute's Water Conflict Chronology is an event database, not an index | **W6-R — SDG indicator 6.5.2:** proportion of transboundary basin area covered by an operational cooperation arrangement (UN-Water). Baseline/target 100% coverage; score = coverage % (direct). Documented reference value: 59% (2023). The construct change (stress → cooperation coverage) is disclosed here and wherever the indicator is displayed. Cadence: annual (SDG reporting cycle). |
| **S3** | No single published global arid-zone NDVI anomaly value exists | **S3-R — Computed dryland NDVI anomaly:** area-weighted mean NDVI anomaly over drylands (UNEP aridity index < 0.65) from the Copernicus Global Land Service NDVI product (1 km, 10-daily) against a 1999–2019 reference, computed and published by VYRION as for W1-R. Baseline 0 anomaly. Threshold PROPOSAL: deviation 0.10 NDVI units (interannual global dryland anomalies run ±0.01–0.02). The disclosed upward pressure from global greening applies to this indicator and is reported with it. Cadence: monthly. |
| **S5** | No global "% of monitored sites declining" statistic exists in any published GSP/FAO product; national networks are non-harmonized | **S5-R — Agricultural-land SOC trend share (modelled equivalent):** percentage of global agricultural land area with declining topsoil SOC in the FAO GSOCseq / ISRIC modelled trend layers; score = 100 − that percentage (direct). Classed ESTIMATED by construction — the weakest of the eight substitutions, and labeled as such wherever used. Cadence: annual. |
| **CA5** | The v2.8 platform computed 8-K density live but never recorded it; no March 2026 value exists in any local record | **CA5-R — Computed at scoring time from SEC EDGAR:** the submissions API is archival, so forward cycles compute CA5 exactly: count of 8-K filings across the portfolio CIKs (data.sec.gov) over the trailing 90 days at the scoring date. Baseline = the portfolio's mean quarterly density over its first four computed cycles (2026), published when set and disclosed as a self-referential baseline; threshold PROPOSAL: +100% over baseline density → 0. Cadence: monthly. |

---

## 6. CA2 / CA6 differentiation

In the v1.0-era dataset, **CA2 and CA6 are the same measurement**: both equal the 9 portfolio companies with SBTi-validated 1.5 °C targets (25.0%). One fact was being counted twice inside the Corporate system.

v1.1 differentiates them, effective from the next scoring cycle:

- **CA2 (unchanged):** SBTi 1.5 °C approval rate — % of portfolio companies holding SBTi-validated 1.5 °C targets. A measure of *validated commitments*.
- **CA6 (redefined):** TPI management-quality alignment — % of portfolio companies at **TPI Management Quality Level 4 or above** (of 5), computed from the `tpi` levels already carried per-company in the CONSCIENCE dataset. A measure of *governance trajectory* — whether climate is managed as a strategic business issue — which is what v1.0's CA6 label ("emissions trajectory alignment") always intended.

**Baseline disclosure:** the v1.1.0 baseline retains CA6 = 25.0, computed under the v1.0 definition, with the redundancy disclosed in `data/index-baseline.json`. The differentiated CA6 applies from the next cycle and *will* move the Corporate system score; that is announced here, in advance, rather than appearing unexplained.

---

## 7. Uncertainty reporting — three numbers, published

v1.0 published a single figure, ±1.8, in a format that presented it as *the* uncertainty. v1.1 publishes the components:

| Component | Value | What it covers |
|---|---|---|
| **Measurement** | **±1.8** (RSS = 1.84, §3) | Instrument error, inter-product spread, sampling and vintage spread of the input values |
| **Model / threshold** | **±4.0** | The framing choices: threshold selections, anchor choices (e.g. March-maximum vs stock cryosphere framing), mapping grids, baseline substitutions. From the reconstruction's sensitivity analysis: one-at-a-time contested choices move the composite ±3–4; all-stern vs all-generous spans ≈ 44.8–51.8 |
| **Total** | **±4.4** | Root-sum-square of the two components: √(1.84² + 4.0²) = √19.39 ≈ 4.4 |

*Note on the record:* the reconstruction draft summarized the total as "≈ ±5." The exact RSS combination of the adopted components is **4.4**, and 4.4 is what v1.1 publishes.

**Reporting format (adopted):** `49.2 ± 1.8 (measurement) · ± 4.4 (total incl. model) / 100`.
The v1.0 minimum-detectable-change rule (±0.5) still applies to like-for-like cycle comparisons: a move smaller than ±0.5 is measurement noise; a move inside the total uncertainty is reported as *unchanged within uncertainty*.

For calibration: the reconstruction is **robust to data corrections** (the CO₂ source correction moves the composite 0.1) and **sensitive to framing** (±3–4). That is the profile of a real index with real methodology decisions to defend — and it is why the thresholds in §2 are published rather than left implicit.

---

## 8. Baseline substitutions — disclosed

The verifiability rule requires that wherever a score rests on a substituted baseline, the substitution is stated, not buried. Four exist:

1. **O2 (Ocean heat content).** v1.0 says "pre-industrial mean." No OHC observations exist before the 1950s. The baseline used is the **1955–2006 climatology**, and the value is an anomaly against it. Unavoidable — and now stated.
2. **C2 (Antarctic sea ice).** v1.0 says "estimated pre-satellite baseline" without a number. The baseline used is **2.90M km²**, an estimate rounded from early-satellite / 1981–2010 values. It is an estimate, and the system's σ (5.0) partly reflects that.
3. **B1 (Living Planet Index).** v1.0's table claims the index is "normalized to 1850." The LPI publishes no such normalization; the value used is the **1970-anchored** index (LPR 2024). The claim in the v1.0 table does not describe the published product.
4. **W2 (Groundwater).** GRACE-era storage anomalies are referenced to a **2004–2009 mean**, not a pre-industrial state. The indicator is therefore scored as a **depletion rate** against a pre-depletion (≈ zero net rate) equilibrium. The construct change is disclosed here and in the baseline JSON.

---

## 9. The v1.1 baseline, in one place

| System | Weight | Score | σ |
|---|---|---|---|
| Atmosphere | 0.22 | 40.9 | 2.5 |
| Ocean | 0.18 | 49.6 | 4.0 |
| Ice / Cryosphere (7 indicators, incl. C1b) | 0.14 | 75.4 | 5.0 |
| Forest | 0.13 | 36.1 | 6.0 |
| Biodiversity | 0.12 | 41.1 | 7.0 |
| Freshwater | 0.10 | 53.6 | 7.0 |
| Soil | 0.07 | 62.4 | 7.0 |
| Corporate Accountability | 0.04 | 34.6 | 3.0 |
| **Composite** | 1.00 | **49.2** | RSS 1.84 |

Coverage: **41 of 49 indicators scored**; 8 excluded as NOT RETRIEVABLE (F3, B5, W1, W4, W6, S3, S5, CA5) — listed, never filled. Freshwater's score rests on 3 of 6 indicators and is **provisional** until the §5 substitutions take effect.

**49.2 ± 1.8 (measurement) · ± 4.4 (total incl. model) / 100** — restated baseline, as of March 2026, methodology v1.1. Both the old published value (41.2) and this one fall in the CRITICAL band (40–54). The interpretation does not change. The defensibility does.

---

*VYRION-METHODOLOGY-V1.1-ADDENDUM.md · October 23, 2026*
*VYRION LLC · Tyler Frost / DablerFrost · Hilo, Hawaii*
*Companion to VYRION-METHODOLOGY-V1.0.md (locked, unamended) · contact@vyrion.earth*
