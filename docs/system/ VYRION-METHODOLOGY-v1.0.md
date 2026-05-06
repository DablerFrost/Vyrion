[VYRION-METHODOLOGY-v1.0 (4).md](https://github.com/user-attachments/files/26689080/VYRION-METHODOLOGY-v1.0.4.md)
[VYRION-METHODOLOGY-v1.0.md](https://github.com/user-attachments/files/26490101/VYRION-METHODOLOGY-v1.0.md)
# VYRION-METHODOLOGY-v1.0.md
## The VYRION Index — Complete Scoring Methodology

---

**Methodology Status: LOCKED — v1.0**
No changes to scoring logic, indicator definitions, weights, or baseline without a version increment.
Changes are logged in CHANGELOG.md. Prior art timestamped: GitHub, March 20, 2026.

**One-Line Definition:**
*The VYRION Score is a weighted transparency index measuring deviation of planetary systems from pre-industrial baseline conditions.*

**Legal Notice:**
All VYRION Index scores are derived from publicly accessible sources including government monitoring agencies, open-license satellite datasets, and public institutional databases. VYRION does not reproduce, redistribute, or sublicense proprietary datasets. Scores represent VYRION's independent analytical assessment based on publicly available information. See LEGAL-DISCLAIMER.md for full terms.

**Investment Notice:**
The VYRION Index is an informational benchmark. It is not investment advice and does not constitute a recommendation to buy, sell, or hold any security. See INVESTABLE-DISCLAIMER.md for full terms.

**Open Proof Protocol:**
Find an error in any indicator, source, formula, or derivation — report it to contact@vyrion.earth. Corrections are published within 24 hours as permanent, timestamped entries in CHANGELOG.md. No original entries are ever deleted.

---

## Part I — System Overview

### What VYRION Measures

The VYRION Index measures the current health of Earth's planetary systems relative to a pre-industrial baseline. A score of 100/100 represents the average conditions of the period 1850–1900 — before significant industrialization — across all eight monitored Earth systems. A score of 0 represents complete system collapse across all indicators.

The index does not predict the future. It measures the present state of documented planetary systems against a well-established scientific baseline, using publicly available data from government and intergovernmental monitoring agencies.

**Two Named Systems Within VYRION:**

**VYRION INDEX (Planetary)** — The composite 0–100 daily score covering 7 planetary systems: Atmosphere, Ocean, Cryosphere, Forest, Biodiversity, Freshwater, and Soil. This is the primary published benchmark.

**VYRION CONSCIENCE (Corporate Layer)** — A separate accountability module tracking corporate climate pledge verification against Paris Agreement 1.5°C pathways. Contributes 4% weight to the VYRION Index as a governance signal. Documented separately in CONSCIENCE-METHODOLOGY.md.

**Important Distinction:** The Corporate Accountability System (VYRION CONSCIENCE) does not influence planetary system health directly. It is included as a governance layer reflecting human institutional response to planetary degradation. A company scoring 84/100 on CONSCIENCE does not improve ocean temperature; it reflects alignment of corporate behavior with the policy frameworks required to address planetary deterioration.

---

## Part II — Architecture

### Eight Systems and Weights

| System | Weight | Rationale |
|--------|--------|-----------|
| Atmosphere | 22% | Primary driver of planetary boundary violations; CO₂ concentration is the master forcing variable |
| Ocean | 18% | Absorbs 90%+ of excess heat; ocean health is the largest single buffer system |
| Ice / Cryosphere | 14% | Albedo feedback and sea level are nonlinear tipping-point risks |
| Forest | 13% | Carbon sink, biodiversity reservoir, hydrological cycle regulator |
| Biodiversity | 12% | Ecosystem services underpin all other system functions |
| Freshwater | 10% | Direct human welfare indicator; stress is geographically concentrated |
| Soil | 7% | Carbon sequestration and food system foundation; degrades slowly but recovers slowly |
| Corporate Accountability | 4% | Governance signal — human institutional response to planetary degradation |

**Weight Basis:** Weights are informed by the planetary boundaries framework (Steffen et al., 2015; Richardson et al., 2023) and reflect the relative contribution of each system to overall Earth system stability. Weights are locked at v1.0. Changes require v1.1 with full rationale documentation.

### Master Formula

```
S_final = Σ(W_i × S_i)

Where:
  W_i = system weight (see table above)
  S_i = system score = max(0, min(100, f(indicator_i, baseline_i)))
```

**Bounding Rule:** All scoring functions are bounded between 0 and 100 using min/max constraints. No individual system score can fall below 0 or exceed 100 regardless of indicator deviation magnitude. This constraint is applied at the system level before weighted aggregation.

**Baseline:** Pre-industrial average conditions, 1850–1900. Defined per indicator as the mean value during this period from the primary data source for that indicator. Baseline values are documented per indicator in Section IV.

### Uncertainty Model

**Reported uncertainty: ±1.8 points (1σ)**

Uncertainty is calculated using root-sum-square (RSS) propagation of reported measurement uncertainties across all 48 indicators, normalized to the 0–100 scale:

```
σ_total = √(Σ(W_i² × σ_i²))

Where:
  σ_i = reported measurement uncertainty for system i
  W_i = system weight
```

Sources of uncertainty include: instrumental measurement error (primary satellites and monitoring stations), spatial sampling limitations, temporal resolution mismatches between daily and annual indicators, and baseline period variability.

**Minimum detectable change: ±0.5 points.** Day-to-day movements below this threshold are within measurement noise and are disclosed as such in all published scores. Score format: `XX.X ± 1.8 / 100`.

---

## Part III — Indicators

### System 1: Atmosphere (22%)

Six indicators. Daily composite update anchored by NOAA GML CO₂.

| # | Indicator | Source | Baseline (1850–1900) | Update |
|---|-----------|--------|----------------------|--------|
| A1 | Atmospheric CO₂ concentration (ppm) | NOAA GML Mauna Loa | ~280 ppm | Daily |
| A2 | Global mean surface temperature anomaly (°C) | NASA GISS Surface Temperature Analysis | 0.0°C anomaly | Monthly |
| A3 | Atmospheric methane concentration (ppb) | NOAA GML | ~722 ppb | Monthly |
| A4 | Atmospheric nitrous oxide concentration (ppb) | NOAA GML | ~270 ppb | Monthly |
| A5 | Radiative forcing — total (W/m²) | IPCC AR6 derived | 0.0 W/m² anomaly | Monthly |
| A6 | Stratospheric ozone column (Dobson units) | Copernicus Atmosphere Monitoring Service | ~300 DU | Monthly |

**Scoring function A1 (primary):**
`S_A1 = max(0, min(100, 100 - ((CO₂_current - 280) / (450 - 280)) × 100))`
Where 450 ppm represents the upper bound associated with >2°C warming scenarios.

### System 2: Ocean (18%)

Six indicators. Daily composite update anchored by NOAA OISST sea surface temperature.

| # | Indicator | Source | Baseline (1850–1900) | Update |
|---|-----------|--------|----------------------|--------|
| O1 | Global mean sea surface temperature anomaly (°C) | NOAA OISST v2.1 | 0.0°C anomaly | Daily |
| O2 | Ocean heat content 0–700m (ZJ) | NOAA National Centers for Environmental Information | Pre-industrial mean | Monthly |
| O3 | Ocean pH (acidity index) | SOCAT / Argo float network | ~8.18 | Monthly |
| O4 | Global mean sea level anomaly (mm) | NASA/CNES TOPEX-Jason series | 0 mm anomaly | Monthly |
| O5 | Atlantic Meridional Overturning Circulation strength (Sv) | RAPID array / model reconstruction | ~18–20 Sv | Monthly |
| O6 | Coral reef bleaching extent (% of reef area affected) | NOAA Coral Reef Watch | <1% | Monthly |

### System 3: Ice / Cryosphere (14%)

Six indicators. Daily composite update anchored by NSIDC Arctic sea ice extent.

| # | Indicator | Source | Baseline (1850–1900) | Update |
|---|-----------|--------|----------------------|--------|
| C1 | Arctic sea ice extent (million km²) | NSIDC Sea Ice Index | ~14.5M km² (March max) / ~7.5M km² (Sept min) | Daily |
| C2 | Antarctic sea ice extent (million km²) | NSIDC Sea Ice Index | Estimated pre-satellite baseline | Daily |
| C3 | Greenland ice sheet mass balance (Gt/yr) | GRACE-FO satellite gravity | Near zero net balance | Monthly |
| C4 | Antarctic ice sheet mass balance (Gt/yr) | GRACE-FO satellite gravity | Near zero net balance | Monthly |
| C5 | Global glacier mass balance (mm water equivalent/yr) | World Glacier Monitoring Service | Near zero net balance | Annual |
| C6 | Arctic sea ice thickness (m) | CryoSat-2 / ICESat-2 | ~3.5m multi-year ice | Monthly |

**Cadence note:** C1 and C2 update daily and anchor the cryosphere composite score. C3–C5 are held at last confirmed value between updates and are disclosed as such.

### System 4: Forest (13%)

Six indicators. Monthly composite refresh.

| # | Indicator | Source | Baseline (1850–1900) | Update |
|---|-----------|--------|----------------------|--------|
| F1 | Global tree cover loss (Mha/yr) | Global Forest Watch / Hansen et al. | Estimated ~2–3 Mha/yr natural | Annual |
| F2 | Tropical deforestation rate (Mha/yr) | Global Forest Watch | Near-zero anthropogenic | Annual |
| F3 | Active wildfire event count | NASA EONET / FIRMS | Historical frequency baseline | Daily |
| F4 | Global forest carbon stock anomaly (GtC) | FAO Global Forest Resources Assessment | Pre-industrial stock estimate | Annual |
| F5 | Primary forest cover remaining (% of 1850 baseline) | Global Forest Watch | 100% | Annual |
| F6 | Forest regrowth rate (Mha/yr) | FAO / Global Forest Watch | Natural regeneration baseline | Annual |

**Note on F3:** Active wildfire count is available daily via NASA EONET and is used as the daily anchor for the Forest system composite. Annual indicators are held at last confirmed value between updates.

### System 5: Biodiversity (12%)

Six indicators. Monthly composite refresh.

| # | Indicator | Source | Baseline (1850–1900) | Update |
|---|-----------|--------|----------------------|--------|
| B1 | Living Planet Index (vertebrate population trends) | WWF / ZSL Living Planet Report | 1.0 (index = 1970 baseline, normalized to 1850) | Annual |
| B2 | Species extinction rate (extinctions per million species-years) | IUCN Red List derived | ~0.1–1 E/MSY natural background | Annual |
| B3 | Global biodiversity intactness index (%) | Natural History Museum / PREDICTS | ~100% | Annual |
| B4 | Marine protected area coverage (% of ocean) | Marine Conservation Institute / MPA Atlas | Natural baseline | Annual |
| B5 | GBIF occurrence record density anomaly | Global Biodiversity Information Facility | Historical species density | Weekly |
| B6 | Insect biomass index (proxy) | Literature synthesis / Hallmann et al. framework | Pre-1970 baseline | Annual |

### System 6: Freshwater (10%)

Six indicators. Daily composite update anchored by SPEI drought index.

| # | Indicator | Source | Baseline (1850–1900) | Update |
|---|-----------|--------|----------------------|--------|
| W1 | Global drought index — SPEI (Standardized Precipitation Evapotranspiration Index) | SPEI Global Drought Monitor | 0.0 anomaly | Daily |
| W2 | Global groundwater storage anomaly (km³) | GRACE-FO | Pre-depletion baseline | Monthly |
| W3 | Global freshwater withdrawal as % of renewable supply | FAO AQUASTAT | Historical low-demand baseline | Annual |
| W4 | River flow anomaly — major basins (% of baseline) | Global Runoff Data Centre / GloFAS | 0% anomaly | Monthly |
| W5 | Lake water level anomaly (% of monitored lakes below baseline) | HydroSat / Copernicus | 0% below baseline | Monthly |
| W6 | Transboundary water stress index | Pacific Institute / FAO | Historical baseline | Annual |

### System 7: Soil (7%)

Six indicators. Monthly composite refresh.

| # | Indicator | Source | Baseline (1850–1900) | Update |
|---|-----------|--------|----------------------|--------|
| S1 | Global soil organic carbon stock (GtC) | FAO GSOC map / ISRIC | Pre-agricultural baseline | Annual |
| S2 | Land degradation index (% of productive land degraded) | FAO / UNCCD | Near-zero anthropogenic degradation | Annual |
| S3 | Desertification proxy — NDVI anomaly in arid zones | Copernicus Land Monitoring / MODIS | Stable vegetation index | Monthly |
| S4 | Soil erosion rate (Gt/yr) | FAO / Borrelli et al. global erosion model | Natural erosion background | Annual |
| S5 | Topsoil depth loss rate (% of monitored sites declining) | Global Soil Partnership / FAO | Near-zero loss rate | Annual |
| S6 | Nitrogen deposition anomaly (kg N/ha/yr above natural) | EMEP / IIASA | Pre-industrial ~1–2 kg N/ha/yr | Monthly |

### System 8: Corporate Accountability (4%)

Six indicators. Daily composite update anchored by SEC EDGAR 8-K event monitoring.

This system does not measure planetary health directly. It measures institutional human response to planetary degradation — the degree to which corporate governance and policy are aligned with scientific requirements for planetary stabilization.

| # | Indicator | Source | Baseline | Update |
|---|-----------|--------|----------|--------|
| CA1 | CDP disclosure quality — portfolio weighted average (A=100, D=0) | CDP public disclosure grades | A-list standard | Annual |
| CA2 | SBTi 1.5°C approval rate — % of portfolio companies | SBTi public registry | 100% approved | Annual |
| CA3 | Active climate litigation count — portfolio total | Sabin Center for Climate Change Law | Zero active cases | Monthly |
| CA4 | Corporate lobbying alignment score — portfolio weighted average | InfluenceMap public profiles | A+ grade standard | Monthly |
| CA5 | SEC 8-K material disclosure event density (events/90 days) | SEC EDGAR public submissions API | Stable baseline | Daily |
| CA6 | Science-based emissions trajectory alignment — portfolio % on 1.5°C path | VYRION CONSCIENCE derived / SBTi | 100% aligned | Annual |

---

## Part IV — Data Sources

All VYRION Index scores are derived from publicly accessible sources. VYRION does not reproduce, redistribute, or sublicense proprietary datasets. Scores represent VYRION's independent analytical assessment based on publicly available information.

| Source | System(s) | Access | License |
|--------|-----------|--------|---------|
| NOAA Global Monitoring Laboratory (GML) | Atmosphere | gml.noaa.gov | Public domain |
| NASA GISS Surface Temperature Analysis | Atmosphere | data.giss.nasa.gov | Public domain |
| NOAA OISST v2.1 | Ocean | ncei.noaa.gov | Public domain |
| NOAA National Centers for Environmental Information | Ocean | ncei.noaa.gov | Public domain |
| SOCAT / Argo Float Network | Ocean | socat.info / argo.ucsd.edu | Open access |
| NASA/CNES Altimetry (TOPEX-Jason) | Ocean | sealevel.nasa.gov | Public domain |
| NSIDC Sea Ice Index | Ice | nsidc.org | Public domain |
| GRACE-FO Satellite Gravity | Ice, Freshwater | podaac.jpl.nasa.gov | Public domain |
| ESA CryoSat-2 / NASA ICESat-2 | Ice | earth.esa.int / icesat-2.gsfc.nasa.gov | Open access |
| World Glacier Monitoring Service | Ice | wgms.ch | Open access |
| Global Forest Watch / Hansen et al. | Forest | globalforestwatch.org | CC BY 4.0 |
| NASA EONET / FIRMS | Forest | eonet.gsfc.nasa.gov | Public domain |
| FAO Global Forest Resources Assessment | Forest, Soil | fao.org | Open access |
| WWF / ZSL Living Planet Report | Biodiversity | livingplanetindex.org | Open access |
| IUCN Red List | Biodiversity | iucnredlist.org | Open access |
| Global Biodiversity Information Facility (GBIF) | Biodiversity | gbif.org | CC BY 4.0 |
| SPEI Global Drought Monitor | Freshwater | spei.csic.es | Open access |
| FAO AQUASTAT | Freshwater | fao.org/aquastat | Open access |
| Copernicus Emergency Management Service | Freshwater | copernicus.eu | Open access |
| FAO Global Soil Organic Carbon Map | Soil | fao.org/global-soil-partnership | Open access |
| Copernicus Land Monitoring Service | Soil | land.copernicus.eu | Open access |
| CDP Public Disclosure Grades | Corporate | cdp.net/en/responses | Public |
| SBTi Company Registry | Corporate | sciencebasedtargets.org | Public |
| Sabin Center Climate Litigation Database | Corporate | climatecasechart.com | Public |
| InfluenceMap Company Profiles | Corporate | influencemap.org | Public |
| SEC EDGAR Submissions API | Corporate | data.sec.gov/submissions | Public domain |

---

## Part V — Scoring Methodology Detail

### Deviation-from-Baseline Approach

Each indicator is converted to a 0–100 score based on its deviation from the pre-industrial baseline. The general function is:

```
S_i = max(0, min(100, 100 × (1 - |deviation_i / threshold_i|)))
```

Where `threshold_i` is the indicator-specific value representing the outer bound of acceptable deviation, typically derived from IPCC risk assessments or planetary boundary quantifications (Richardson et al., 2023).

**All individual scoring functions are bounded between 0 and 100 using min/max constraints.** No system score can fall below 0 or exceed 100.

### Indicator Normalization

Indicators with different units and scales are normalized before aggregation. Normalization is linear within each indicator's defined range. Indicators where higher values represent better outcomes (e.g., forest cover remaining) are scored ascending. Indicators where higher values represent worse outcomes (e.g., CO₂ concentration) are scored descending.

### Missing Data Protocol

When a primary data source is unavailable:
1. The most recent confirmed value is held for up to 7 days
2. After 7 days, the indicator is flagged as "data gap" and the system uncertainty bounds are widened
3. Data gaps are published openly in the daily archive

### Update Cadence Summary

| Cadence | Systems | Indicators |
|---------|---------|------------|
| Daily | Atmosphere, Ocean, Cryosphere, Freshwater, Corporate (CA5) | A1, O1, C1, C2, W1, CA5 |
| Weekly | Biodiversity (partial) | B5 |
| Monthly | All systems (remaining indicators) | All non-daily indicators |
| Annual | Forest, Biodiversity, Soil (primary data) | F1, F2, F4, F5, F6, B1, B2, B3, B4, B6, W3, W6, S1, S2, S4, S5, CA1, CA2, CA6 |

**Public framing:** "Daily composite score. 48 indicators. Update cadences published openly." Annual indicators are held at last confirmed value between updates and disclosed as such.

---

## Part VI — Validation and Integrity

### Scientific Basis

The VYRION Index methodology is informed by:

- Steffen, W. et al. (2015). "Planetary Boundaries: Guiding human development on a changing planet." *Science*, 347(6223).
- Richardson, K. et al. (2023). "Earth beyond six of nine planetary boundaries." *Science Advances*, 9(37).
- IPCC AR6 Working Group I, II, and III reports (2021–2022).
- Rockström, J. et al. (2009). "A safe operating space for humanity." *Nature*, 461, 472–475.

### Reproducibility Standard

Every indicator in this document has:
- A named primary source with a URL
- A defined baseline value
- A documented scoring function
- A stated update cadence

Anyone with access to the listed public sources can reproduce the VYRION Index score independently. This is the defining commitment of v1.0.

### Limitations

1. **Annual indicator latency:** 20 of 48 indicators update annually. Their contribution to the composite is based on the most recently published data and may lag real-world conditions by up to 12 months.
2. **Spatial averaging:** Global composites mask regional variation. A global average ocean temperature can be stable while a specific ocean basin is in crisis.
3. **Model dependence:** Some indicators (AMOC strength, long-term glacier balance) rely on model reconstructions rather than direct observation. Uncertainty is higher for these indicators.
4. **Corporate Accountability lag:** CDP grades, SBTi status, and litigation counts are point-in-time assessments that update on publication cycles, not continuously.

### Planned Improvements (v1.1)

- System Interaction Matrix: cascade and feedback coefficients between the 8 systems
- Weighting Rationale appendix: full derivation of system weights from planetary boundaries literature
- Indicator Substitution Protocol: fallback indicators for primary data source failure
- Regional disaggregation: sub-global scores for major geographic zones

---

## Part VII — CONSCIENCE Corporate Layer

VYRION CONSCIENCE is documented in full in CONSCIENCE-METHODOLOGY.md. Summary for cross-reference:

**Scoring:** 0–100 scale from four factors: Pledge Quality (30 pts), CDP Performance (25 pts), Lobbying Alignment (25 pts), Legal Exposure (20 pts).

**Band thresholds:** Breach 0–30 · Warning 31–60 · On Track 61–100

**Basis:** Paris Agreement 1.5°C pathways · Science Based Targets initiative criteria

**Current portfolio (v1.0, March 18, 2026):**
ExxonMobil 8 · BP 11 · Delta 14 · Shell 19 · Starbucks 29 · Walmart 38 · Meta 43 · Amazon 47 · Microsoft 61 · Unilever 72 · Apple 84

**CONSCIENCE Index contribution:** The portfolio mean score, normalized and weighted at 4%, contributes to the VYRION Index. A portfolio mean of 38.6/100 against a 100/100 baseline contributes a depressed governance signal to the composite. This reflects the current gap between corporate climate governance and the scientific requirements for planetary stabilization.

---

## Part VIII — Disclaimers

### Legal

All VYRION Index scores are derived from publicly accessible sources including government monitoring agencies, open-license satellite datasets, and public institutional databases. VYRION does not reproduce, redistribute, or sublicense proprietary datasets. Scores represent VYRION's independent analytical assessment based on publicly available information. Full legal terms: LEGAL-DISCLAIMER.md.

### Investment

The VYRION Index is an informational benchmark. It is not investment advice and does not constitute a recommendation to buy, sell, or hold any security. Institutional users should conduct independent due diligence. Full investment terms: INVESTABLE-DISCLAIMER.md.

### Open Proof Protocol

Find an error — contact@vyrion.earth. Correction published within 24 hours. No original entries deleted.

**"Find the error. We will publish the correction."**

---

*VYRION-METHODOLOGY-v1.0.md · Locked March 20, 2026*
*VYRION PBC · Tyler Frost / DablerFrost · Hilo, Hawaii*
*github.com/dablerfrost/conscience · contact@vyrion.earth*
