Methodology v1.0 formalizes the scoring framework 
used to calculate scores published March 18-20, 2026. 
All scores are recalculated against this published 
methodology for full transparency.

---

# VYRION INDEX — METHODOLOGY & INDICATOR FRAMEWORK
## A Daily Investable Planetary Health Benchmark
**Version 1.0 — March 2026**
VYRION PBC · The Nexan Institute · Hilo, Hawaii
Platform: dablerfrost.github.io/conscience
Contact: contact@vyrion.earth

---

## EXECUTIVE SUMMARY

The VYRION Index is the world's first daily investable planetary health benchmark — a single composite score from 0 to 100 representing the current condition of Earth's eight critical systems relative to pre-industrial baseline. Built entirely on publicly verifiable data from government agencies, satellite systems, and peer-reviewed scientific institutions, the Index is updated daily and published free to the public with full methodology transparency. At Day 2 (March 19, 2026), the VYRION Index scores 41.2/100 — meaning Earth's planetary systems are operating at less than half the health of their pre-industrial baseline, with accelerating deterioration in cryosphere and ocean systems. Institutional applications include ESG data licensing, sovereign risk modeling, climate finance benchmarking, and corporate accountability infrastructure.

---

## SECTION 1 — BASELINE FRAMEWORK

### Baseline Period: Pre-Industrial Average 1850–1900

The VYRION Index anchors to the 1850–1900 pre-industrial average as the 100/100 reference state. This period represents the last era of relative planetary systems equilibrium before large-scale anthropogenic forcing — and is the same baseline used by the IPCC Sixth Assessment Report (AR6) for global temperature anomaly reporting, ensuring direct alignment with the world's leading climate science authority. Where pre-industrial data does not exist for a specific indicator (primarily ocean and soil systems), the closest available scientific reference period is used and noted explicitly.

### Score Interpretation

| Score | Meaning |
|-------|---------|
| **100 / 100** | All eight planetary systems operating within pre-industrial parameters. No measurable anthropogenic deviation from 1850–1900 baseline conditions. |
| **41.2 / 100** | Earth's systems are collectively operating at 41.2% of pre-industrial health. This reflects cumulative anthropogenic forcing across atmosphere, cryosphere, ocean, terrestrial, and biological systems — consistent with IPCC AR6 findings of ~1.1–1.3°C global mean warming and widespread biodiversity, ice, and carbon cycle disruption. |
| **0 / 100** | Complete systems collapse — all indicators at or beyond defined catastrophic thresholds. Theoretical floor representing full planetary systems failure. |

---

## SECTION 2 — SCORING FORMULA

### Formula Name
**Deviation-from-Baseline Weighted Composite Index**

### Notation
```
S_final = Σ(W_i × S_i)

Where:
  S_final  = Final VYRION Index score (0–100)
  W_i      = Weight of system i (see Section 3)
  S_i      = System score for system i (0–100)
  S_i      = max(0, min(100, f(indicator_i, baseline_i)))
  f()      = Indicator-specific scoring function (see each indicator)
```

### Plain Language Description
Each of the 48 indicators is normalized to a 0–100 scale using an indicator-specific function that measures deviation from pre-industrial baseline — the further from baseline, the lower the score. The six indicators within each system are averaged (using within-system weights) to produce a system score from 0–100. The eight system scores are then combined using the VYRION Index system weights (Atmosphere 22%, Ocean 18%, Ice 14%, Forest 13%, Biodiversity 12%, Freshwater 10%, Soil 7%, Corporate 4%) to produce the final daily composite score.

### Daily Update Protocol
Each morning, any indicators with new published data are ingested from their source agencies, the affected system scores are recalculated, and the composite index is updated. All updates are committed to the public GitHub repository with a timestamp before the daily score is published. Indicators updated monthly or annually carry their most recent value forward until refreshed.

---

### Uncertainty & Minimum Detectable Change

All VYRION Index scores carry a propagated uncertainty 
of approximately ±1.8 points derived from source data 
measurement error across the 48 indicators. Day-to-day 
score changes of less than ±0.5 points fall within 
measurement uncertainty and should not be interpreted 
as statistically significant movements. Scores are 
reported as: [score] ± 1.8 / 100.

---

## SECTION 3 — THE 48 INDICATORS

### SYSTEM 1 — ATMOSPHERE (Weight: 22%)

---

**ATM-01 · Atmospheric CO₂ Concentration**
- Measures: Global mean atmospheric CO₂ in parts per million (ppm)
- Source: NOAA Global Monitoring Laboratory — https://gml.noaa.gov/ccgg/trends/
- Baseline: 280 ppm (1850–1900 average)
- Current: 422.8 ppm (2024 annual mean)
- Scoring: `Score = max(0, 100 × (280 / current_ppm))` — declines proportionally as CO₂ rises above baseline; approaches 0 near 560 ppm (doubling)
- Weight within system: 30%
- Update frequency: Daily

---

**ATM-02 · Global Mean Surface Temperature Anomaly**
- Measures: Global average surface temperature deviation from 1850–1900 baseline in °C
- Source: NASA GISS Surface Temperature Analysis (GISTEMP) — https://data.giss.nasa.gov/gistemp/
- Baseline: 0.0°C anomaly (1850–1900 reference period)
- Current: +1.3°C anomaly (2024 annual mean)
- Scoring: `Score = max(0, 100 − (anomaly_°C × 40))` — each 0.1°C above baseline costs 4 points; score reaches 0 at +2.5°C
- Weight within system: 25%
- Update frequency: Monthly

---

**ATM-03 · Atmospheric Methane Concentration**
- Measures: Global mean atmospheric CH₄ in parts per billion (ppb)
- Source: NOAA Global Monitoring Laboratory — https://gml.noaa.gov/ccgg/trends_ch4/
- Baseline: ~722 ppb (pre-industrial 1850–1900)
- Current: ~1923 ppb (2024)
- Scoring: `Score = max(0, 100 × (722 / current_ppb))` — proportional decline; current reading reflects ~2.7× pre-industrial concentration
- Weight within system: 15%
- Update frequency: Monthly

---

**ATM-04 · Atmospheric Nitrous Oxide Concentration**
- Measures: Global mean atmospheric N₂O in parts per billion (ppb)
- Source: NOAA Global Monitoring Laboratory — https://gml.noaa.gov/ccgg/trends_n2o/
- Baseline: ~270 ppb (pre-industrial 1850–1900)
- Current: ~336 ppb (2024)
- Scoring: `Score = max(0, 100 × (270 / current_ppb))` — proportional decline from baseline
- Weight within system: 10%
- Update frequency: Monthly

---

**ATM-05 · Stratospheric Ozone (Dobson Units)**
- Measures: Total column ozone globally, tracking recovery from depletion
- Source: NASA Ozone Watch / Goddard Space Flight Center — https://ozonewatch.gsfc.nasa.gov/
- Baseline: ~300 DU (1850–1900 pre-CFC era)
- Current: ~283 DU global average (2024); Antarctic hole persists seasonally
- Scoring: `Score = max(0, 100 × (current_DU / 300))` — tracks ozone layer recovery toward baseline
- Weight within system: 10%
- Update frequency: Daily (satellite)

---

**ATM-06 · Global Aerosol Optical Depth**
- Measures: Atmospheric aerosol loading (pollution particulates, wildfire smoke, dust) affecting radiation balance
- Source: NASA MODIS/MAIAC Aerosol Product — https://earthdata.nasa.gov/
- Baseline: ~0.05 AOD (pre-industrial background)
- Current: ~0.14 AOD (2024 global mean)
- Scoring: `Score = max(0, 100 × (0.05 / current_AOD))` — elevated aerosols indicate pollution and climate forcing
- Weight within system: 10%
- Update frequency: Daily (satellite)

---

### SYSTEM 2 — ICE / CRYOSPHERE (Weight: 14%)

---

**ICE-01 · Arctic Sea Ice Extent**
- Measures: Total Arctic sea ice area in million km², September minimum and March maximum
- Source: NSIDC Sea Ice Index — https://nsidc.org/data/seaice_index/
- Baseline: 7.0M km² September average (1981–2010 satellite reference)
- Current: New daily low for March recorded March 19, 2026 — 14% below 1981–2010 average
- Scoring: `Score = max(0, 100 × (current_extent / baseline_extent))` — direct proportion to ice coverage
- Weight within system: 30%
- Update frequency: Daily

---

**ICE-02 · Antarctic Sea Ice Extent**
- Measures: Total Antarctic sea ice area in million km²
- Source: NSIDC Sea Ice Index — https://nsidc.org/data/seaice_index/
- Baseline: 12.0M km² February average (1981–2010 satellite reference)
- Current: Record lows recorded 2023–2024; ~1M km² below prior records
- Scoring: `Score = max(0, 100 × (current_extent / baseline_extent))` — direct proportion
- Weight within system: 20%
- Update frequency: Daily

---

**ICE-03 · Greenland Ice Sheet Mass Balance**
- Measures: Annual mass change of Greenland Ice Sheet in gigatons (Gt)
- Source: NASA GRACE-FO / DTU Space — https://climate.nasa.gov/vital-signs/ice-sheets/
- Baseline: 0 Gt/yr net change (pre-industrial equilibrium)
- Current: −280 Gt/yr average (2003–2023 GRACE record)
- Scoring: `Score = max(0, 100 + (mass_change_Gt_yr / 5))` — each 5 Gt/yr net loss costs 1 point
- Weight within system: 20%
- Update frequency: Monthly

---

**ICE-04 · Global Glacier Volume**
- Measures: Global glacier mass relative to pre-industrial volume, indexed
- Source: World Glacier Monitoring Service — https://wgms.ch/
- Baseline: 1.0 index value (pre-industrial glacier volume)
- Current: ~0.72 index (approximately 28% volume loss since pre-industrial)
- Scoring: `Score = max(0, 100 × current_index)` — direct proportion to remaining volume
- Weight within system: 15%
- Update frequency: Annual

---

**ICE-05 · Northern Hemisphere Permafrost Temperature**
- Measures: Mean temperature anomaly of Northern Hemisphere permafrost (top 10m) vs baseline
- Source: Global Terrestrial Network for Permafrost (GTN-P) — https://gtnp.arcticportal.org/
- Baseline: 0.0°C anomaly (pre-industrial reference)
- Current: +0.3°C to +1.5°C depending on region (2024)
- Scoring: `Score = max(0, 100 − (anomaly_°C × 30))` — warming permafrost risks catastrophic methane release
- Weight within system: 10%
- Update frequency: Annual

---

**ICE-06 · Northern Hemisphere Snow Cover Extent**
- Measures: Annual average Northern Hemisphere snow cover area in million km²
- Source: Rutgers Global Snow Lab — https://climate.rutgers.edu/snowcover/
- Baseline: ~46M km² annual average (1967–1990 reference)
- Current: ~43M km² annual average (declining trend 2010s–2020s)
- Scoring: `Score = max(0, 100 × (current_Mkm2 / 46))` — proportion to reference period extent
- Weight within system: 5%
- Update frequency: Weekly

---

### SYSTEM 3 — OCEAN (Weight: 18%)

---

**OCN-01 · Ocean Heat Content (0–2000m)**
- Measures: Accumulated thermal energy in the global ocean from surface to 2000m depth, in zettajoules (ZJ) anomaly
- Source: NOAA NCEI Ocean Heat Content — https://www.ncei.noaa.gov/access/global-ocean-heat-content/
- Baseline: 0 ZJ anomaly (1955 reference — closest available to pre-industrial)
- Current: +450 ZJ (2024; 14th consecutive record-high month)
- Scoring: `Score = max(0, 100 − (anomaly_ZJ / 6))` — each 6 ZJ above baseline costs 1 point
- Weight within system: 25%
- Update frequency: Monthly

---

**OCN-02 · Ocean Surface pH (Acidification)**
- Measures: Global mean ocean surface pH
- Source: NOAA Ocean Acidification Program / HOT — https://www.pmel.noaa.gov/co2/story/Ocean+Acidification
- Baseline: 8.2 pH (pre-industrial 1850–1900)
- Current: 8.08 pH (2024)
- Scoring: `Score = max(0, 100 − ((8.2 − current_pH) × 833))` — each 0.1 pH unit drop costs ~83 points; reflects logarithmic acidity increase
- Weight within system: 20%
- Update frequency: Monthly

---

**OCN-03 · Global Mean Sea Level Rise**
- Measures: Global mean sea level change relative to 1993 satellite altimetry baseline, in mm
- Source: NASA Sea Level Change / Copernicus — https://sealevel.nasa.gov/
- Baseline: 0 mm anomaly (1993 satellite reference; ~+120mm above pre-industrial)
- Current: +100mm above 1993 reference (2024)
- Scoring: `Score = max(0, 100 − (total_rise_mm / 3))` — each 3mm above pre-industrial equivalent costs 1 point
- Weight within system: 20%
- Update frequency: Monthly (satellite altimetry)

---

**OCN-04 · Global Coral Reef Bleaching Coverage**
- Measures: Percentage of monitored global coral reef area under bleaching alert conditions
- Source: NOAA Coral Reef Watch — https://coralreefwatch.noaa.gov/
- Baseline: <1% of reefs under thermal stress (pre-industrial conditions)
- Current: 4th global bleaching event declared 2024; ~60% of reefs under alert
- Scoring: `Score = max(0, 100 − (bleaching_pct × 1.5))` — 60% bleaching = score of ~10
- Weight within system: 20%
- Update frequency: Weekly (satellite SST)

---

**OCN-05 · Atlantic Meridional Overturning Circulation (AMOC) Strength**
- Measures: AMOC flow rate index relative to pre-industrial strength
- Source: RAPID Climate Change / UK National Oceanography Centre — https://rapid.ac.uk/rapidmoc/
- Baseline: 1.0 index (pre-industrial equilibrium strength, ~18 Sv)
- Current: ~0.85 index (estimated 15% weakening since pre-industrial; 2024)
- Scoring: `Score = max(0, 100 × current_index)` — direct proportion; collapse toward 0 would be catastrophic
- Weight within system: 10%
- Update frequency: Monthly

---

**OCN-06 · Open Ocean Dissolved Oxygen Content**
- Measures: Global ocean oxygen content, tracking deoxygenation from warming
- Source: ICES / GO-SHIP Repeat Hydrography — https://www.go-ship.org/
- Baseline: Pre-industrial dissolved oxygen equilibrium
- Current: ~2% global decline in ocean oxygen since 1960; accelerating in deep ocean
- Scoring: `Score = max(0, 100 − (deoxygenation_pct × 5))` — each 1% oxygen loss costs 5 points
- Weight within system: 5%
- Update frequency: Annual

---

### SYSTEM 4 — FRESHWATER (Weight: 10%)

---

**FW-01 · Global Groundwater Storage Anomaly**
- Measures: Global groundwater storage deviation from reference, in cm water equivalent
- Source: NASA GRACE / GRACE-FO — https://grace.jpl.nasa.gov/
- Baseline: 0 cm anomaly (2002–2017 reference period)
- Current: −3.2 cm global average (2024)
- Scoring: `Score = max(0, 100 + (anomaly_cm × 5))` — each 1cm depletion below reference costs 5 points
- Weight within system: 25%
- Update frequency: Monthly

---

**FW-02 · Global River Discharge Anomaly**
- Measures: Mean global river discharge relative to pre-industrial baseline
- Source: Global Runoff Data Centre (GRDC) — https://www.bafg.de/GRDC/
- Baseline: Pre-industrial river discharge equilibrium
- Current: Increasing discharge variability; ~15% reduction in arid region basins
- Scoring: `Score = max(0, 100 − (discharge_deficit_pct × 2))` — tracks freshwater flow availability
- Weight within system: 20%
- Update frequency: Monthly

---

**FW-03 · Global Lake Water Storage**
- Measures: Total global lake water storage anomaly from reference in km³
- Source: NASA USDA / Hydroweb — https://hydroweb.theia-land.fr/
- Baseline: 0 km³ anomaly (1993 reference)
- Current: ~−800 km³ (significant lake shrinkage observed globally, incl. Aral Sea, Lake Chad, Great Salt Lake)
- Scoring: `Score = max(0, 100 − (deficit_km3 / 30))` — each 30 km³ net loss costs 1 point
- Weight within system: 20%
- Update frequency: Monthly

---

**FW-04 · Global Water Stress Index**
- Measures: Population-weighted water stress level globally (ratio of withdrawal to available supply)
- Source: WRI Aqueduct — https://www.wri.org/aqueduct
- Baseline: Low baseline water stress (pre-industrial, pre-industrial agriculture)
- Current: ~4 billion people experiencing severe water stress at least 1 month/yr (2024)
- Scoring: `Score = max(0, 100 − (pop_pct_severe_stress × 1.2))` — tracks human-facing freshwater scarcity
- Weight within system: 20%
- Update frequency: Annual

---

**FW-05 · Global Wetland Extent**
- Measures: Total global wetland area relative to pre-industrial baseline in million hectares
- Source: Ramsar Convention / Global Wetlands Observatory — https://www.global-wetlands.org/
- Baseline: ~1,200 Mha (pre-industrial estimate)
- Current: ~1,000 Mha (estimated 35% loss since pre-industrial; 1% per year loss rate ongoing)
- Scoring: `Score = max(0, 100 × (current_Mha / 1200))` — direct proportion to baseline wetland coverage
- Weight within system: 10%
- Update frequency: Annual

---

**FW-06 · Glacier-Fed River Flow Index**
- Measures: Index of glacier contribution to major river systems globally
- Source: WGMS / HiMAT NASA — https://www.nasa.gov/HiMAT
- Baseline: 1.0 index (pre-industrial glacier-fed flow)
- Current: ~0.78 (22% reduction in glacier contribution to major Asian and Andean river systems)
- Scoring: `Score = max(0, 100 × current_index)` — direct proportion; affects billions relying on glacial melt
- Weight within system: 5%
- Update frequency: Annual

---

### SYSTEM 5 — FOREST (Weight: 13%)

---

**FOR-01 · Global Forest Cover Area**
- Measures: Total global forested area in million hectares (Mha)
- Source: Global Forest Watch / Hansen UMD/Google — https://www.globalforestwatch.org/
- Baseline: ~6,000 Mha (pre-agricultural estimate)
- Current: ~4,060 Mha (2024 estimate net of regrowth)
- Scoring: `Score = 100 × (current_Mha / 6000)` — linear proportion to pre-industrial forest cover
- Weight within system: 30%
- Update frequency: Annual (near-real-time alerts available)

---

**FOR-02 · Annual Tropical Primary Forest Loss**
- Measures: Annual area of tropical primary forest lost in million hectares per year
- Source: Global Forest Watch — https://www.globalforestwatch.org/
- Baseline: ~0 Mha/yr net loss (pre-industrial equilibrium)
- Current: ~4.1 Mha/yr (2023; Brazil, DRC, Indonesia primary drivers)
- Scoring: `Score = max(0, 100 − (annual_loss_Mha × 15))` — each 1 Mha annual loss costs 15 points; penalizes acceleration
- Weight within system: 25%
- Update frequency: Annual

---

**FOR-03 · Global Forest Carbon Stock**
- Measures: Carbon stored in global forest biomass (above and below ground) in gigatons (Gt C)
- Source: FAO Global Forest Resources Assessment — https://www.fao.org/forest-resources-assessment/
- Baseline: ~861 Gt C (pre-industrial forest carbon estimate)
- Current: ~662 Gt C (2020 estimate; net loss from deforestation and degradation)
- Scoring: `Score = max(0, 100 × (current_GtC / 861))` — direct proportion to carbon storage function
- Weight within system: 20%
- Update frequency: Annual (FRA cycle)

---

**FOR-04 · Tree Canopy Cover Density**
- Measures: Mean canopy cover density of existing forests globally (%)
- Source: NASA MODIS Vegetation Continuous Fields — https://lpdaac.usgs.gov/
- Baseline: Estimated dense pre-industrial canopy coverage
- Current: ~31% of land area with >10% canopy cover (declining quality)
- Scoring: `Score = max(0, 100 × (current_canopy_pct / 40))` — tracks forest quality, not just area
- Weight within system: 15%
- Update frequency: Annual

---

**FOR-05 · Global Forest Fire Burned Area**
- Measures: Annual global area burned in forest fires in million hectares
- Source: Copernicus GFED / EFFIS — https://effis.jrc.ec.europa.eu/
- Baseline: ~2 Mha/yr (pre-industrial natural fire regime estimate)
- Current: ~4–8 Mha/yr extreme fire years (2023 Canada record: 18 Mha)
- Scoring: `Score = max(0, 100 − ((current_Mha − 2) × 8))` — costs above natural baseline
- Weight within system: 7%
- Update frequency: Daily (active fire) / Annual (totals)

---

**FOR-06 · Boreal Forest Integrity Index**
- Measures: Condition of boreal forest (taiga) biome globally — fragmentation, degradation, fire
- Source: Global Forest Watch Intact Forest Landscapes — https://www.intactforests.org/
- Baseline: 1.0 index (pre-industrial intact boreal)
- Current: ~0.82 (18% reduction in intact boreal landscapes since 1990)
- Scoring: `Score = max(0, 100 × current_index)` — direct proportion
- Weight within system: 3%
- Update frequency: Annual

---

### SYSTEM 6 — BIODIVERSITY (Weight: 12%)

---

**BIO-01 · Living Planet Index**
- Measures: Average population size trend of vertebrate species (mammals, birds, fish, reptiles, amphibians) relative to 1970 baseline
- Source: WWF / Zoological Society of London — https://www.livingplanetindex.org/
- Baseline: 1.0 index value (1970 reference)
- Current: 0.31 (69% average decline in monitored wildlife populations since 1970)
- Scoring: `Score = max(0, 100 × current_LPI)` — direct proportion; 0.31 LPI = 31/100
- Weight within system: 30%
- Update frequency: Biennial (interpolated annually)

---

**BIO-02 · IUCN Red List Index**
- Measures: Survival probability index of species across all taxonomic groups assessed
- Source: IUCN Red List — https://www.iucnredlist.org/
- Baseline: 1.0 index (all species at Least Concern)
- Current: ~0.73 (deteriorating across birds, mammals, amphibians, corals)
- Scoring: `Score = max(0, 100 × current_RLI)` — direct proportion to species survival probability
- Weight within system: 25%
- Update frequency: Annual

---

**BIO-03 · Annual Species Extinction Rate**
- Measures: Estimated global species extinction rate vs background rate (extinctions per million species per year, E/MSY)
- Source: IPBES Global Assessment — https://ipbes.net/global-assessment
- Baseline: 0.1–1 E/MSY (natural background rate)
- Current: ~100–1,000 E/MSY (current estimated rate; 100–1,000× background)
- Scoring: `Score = max(0, 100 − (log10(current_rate / baseline_rate) × 25))` — logarithmic; 100× background = 50 points lost
- Weight within system: 20%
- Update frequency: Annual

---

**BIO-04 · Global Protected Area Coverage**
- Measures: Percentage of Earth's land and ocean surface under effective protection
- Source: UNEP-WCMC / Protected Planet — https://www.protectedplanet.net/
- Baseline: 30% target (30×30 scientific consensus for biodiversity protection)
- Current: ~17% land, ~8% ocean effectively protected (2024)
- Scoring: `Score = max(0, 100 × (current_land_pct / 30))` — tracks progress toward minimum viable protection threshold
- Weight within system: 15%
- Update frequency: Annual

---

**BIO-05 · Global Pollinator Abundance Index**
- Measures: Population trend index for key pollinator species (bees, butterflies, hoverflies)
- Source: IPBES / Pesticide Atlas / national monitoring networks — https://ipbes.net/
- Baseline: 1.0 index (pre-industrial pollinator abundance)
- Current: ~0.65 (estimated 35% decline in managed and wild pollinator populations)
- Scoring: `Score = max(0, 100 × current_index)` — direct proportion; affects global food security
- Weight within system: 7%
- Update frequency: Annual

---

**BIO-06 · Invasive Species Spread Index**
- Measures: Rate of new biological invasions and range expansion of invasive species globally
- Source: IUCN Invasive Species Specialist Group — https://www.iucngisd.org/
- Baseline: Minimal pre-industrial invasion pressure
- Current: Accelerating — invasive species cost >$423B/yr globally; affecting 80% of threatened species
- Scoring: `Score = max(0, 100 − (invasion_pressure_index × 10))` — tracks acceleration of biological homogenization
- Weight within system: 3%
- Update frequency: Annual

---

### SYSTEM 7 — SOIL (Weight: 7%)

---

**SOIL-01 · Global Soil Organic Carbon Stock**
- Measures: Carbon stored in global agricultural and grassland soils (upper 2m), in petagrams (Pg C)
- Source: FAO Global Soil Organic Carbon Map (GSOCmap) — https://www.fao.org/soils-portal/data-hub/soil-maps-and-databases/gsocmap/en/
- Baseline: Estimated pre-industrial SOC stocks (~2,500 Pg C in top 2m globally)
- Current: ~65 Pg C lost from upper 2m since pre-industrial; ongoing loss ~0.5% per year
- Scoring: `Score = max(0, 100 − (carbon_loss_Pg / 1.3))` — each Pg C lost costs ~0.77 points
- Weight within system: 30%
- Update frequency: Annual

---

**SOIL-02 · Global Soil Erosion Rate**
- Measures: Annual global soil erosion rate in billion tonnes per year
- Source: FAO GLADIS / Joint Research Centre — https://esdac.jrc.ec.europa.eu/
- Baseline: ~21 Bt/yr (estimated natural geological erosion rate)
- Current: ~36 Bt/yr (2024; accelerated by agriculture, deforestation, construction)
- Scoring: `Score = max(0, 100 − ((current_Btyr − 21) / 0.5))` — penalizes erosion above natural rate
- Weight within system: 25%
- Update frequency: Annual

---

**SOIL-03 · Global Land Degradation Area**
- Measures: Total area of degraded land globally in million hectares
- Source: UNCCD / ISRIC World Soil Information — https://www.isric.org/
- Baseline: Minimal pre-industrial degradation
- Current: ~2,000 Mha degraded globally; ~12 Mha/yr new degradation
- Scoring: `Score = max(0, 100 − (degraded_Mha / 50))` — each 50 Mha degraded costs 1 point
- Weight within system: 20%
- Update frequency: Annual

---

**SOIL-04 · Soil pH Deviation (Agricultural Acidification)**
- Measures: Mean deviation of global agricultural soil pH from optimal range (6.0–7.0)
- Source: ISRIC SoilGrids — https://www.soilgrids.org/
- Baseline: Mean pH ~6.5 (pre-industrial agricultural soils)
- Current: Widespread acidification (pH <5.5 in ~30% of agricultural areas); alkalinization in irrigated zones
- Scoring: `Score = max(0, 100 − (deviation_from_optimal_pH × 20))` — tracks chemical soil health
- Weight within system: 15%
- Update frequency: Annual

---

**SOIL-05 · Global Desertification Extent**
- Measures: Area of dryland subject to desertification as % of total dryland area
- Source: UNCCD / NASA MODIS — https://www.unccd.int/land-and-life/desertification/overview
- Baseline: Pre-industrial dryland degradation levels
- Current: ~23% of global land affected by desertification; 168 countries impacted
- Scoring: `Score = max(0, 100 − (desertification_pct × 2))` — 50% desertification = score of 0
- Weight within system: 7%
- Update frequency: Annual

---

**SOIL-06 · Topsoil Loss Rate**
- Measures: Annual rate of productive topsoil loss globally in mm/yr equivalent
- Source: FAO / Cornell University Soil Health — https://www.fao.org/soils-portal/
- Baseline: ~0.01 mm/yr (natural topsoil formation rate)
- Current: ~1.0 mm/yr average loss rate on cultivated land (100× natural formation rate)
- Scoring: `Score = max(0, 100 − ((current_rate / baseline_rate) × 1))` — normalized to formation vs loss ratio
- Weight within system: 3%
- Update frequency: Annual

---

### SYSTEM 8 — CORPORATE ACCOUNTABILITY (Weight: 4%)
*Powers the VYRION CONSCIENCE Module*

---

**CORP-01 · Scope 1+2 Emissions vs Pledge Trajectory**
- Measures: Percentage deviation between company's actual reported Scope 1+2 emissions and their own stated annual reduction trajectory toward their net-zero pledge
- Source: CDP Climate Disclosure — https://www.cdp.net/en/data
- Scoring: `100 if on or ahead of own trajectory; −10 pts per 5% gap behind trajectory; 0 if >50% behind`
- Weight within system: 25%
- Update frequency: Annual (CDP/sustainability report filing)

---

**CORP-02 · Scope 3 Disclosure Quality**
- Measures: Completeness and specificity of Scope 3 (value chain) emissions disclosure — the dominant emission source for most companies
- Source: CDP / SEC 10-K Sustainability Disclosures
- Scoring: `100 = full Scope 3 disclosure across all 15 categories with third-party verification; −15 pts per missing category; 0 = no Scope 3 disclosure`
- Weight within system: 20%
- Update frequency: Annual

---

**CORP-03 · Capital Expenditure Alignment**
- Measures: Proportion of annual capex directed toward net-zero aligned activities vs fossil fuel / high-carbon investment
- Source: Company Annual Reports / SEC 10-K / Bloomberg ESG Terminal
- Scoring: `Score = 100 × (green_capex_pct / 100); penalized if fossil fuel capex expanding vs prior year`
- Weight within system: 20%
- Update frequency: Annual

---

**CORP-04 · Third-Party Verification Status**
- Measures: Whether company's climate claims are verified by an independent, accredited third party (SBTi, CDP A-List, BSI, EY, PwC assurance)
- Source: Science Based Targets Initiative — https://sciencebasedtargets.org/
- Scoring: `SBTi-committed and verified = 100; CDP-disclosed only = 60; Self-reported only = 20; No verification = 0`
- Weight within system: 15%
- Update frequency: Annual

---

**CORP-05 · Pledge Legal Bindingness**
- Measures: Legal and governance strength of climate commitment — board-level mandate, regulatory filing, or purely voluntary
- Source: SEC Climate Disclosure Filings / Company Governance Documents
- Scoring: `Legally binding board mandate filed with regulator = 100; Board resolution = 70; Executive commitment only = 40; No formal pledge = 0`
- Weight within system: 12%
- Update frequency: Annual

---

**CORP-06 · Historical Pledge Revision Pattern**
- Measures: Whether company has previously weakened, delayed, or quietly abandoned prior climate commitments
- Source: Company historical sustainability reports / CDP archive / Media record
- Scoring: `No revisions = 100; One minor revision = 70; Major weakening or deadline extension = 30; Pledge abandoned = 0`
- Weight within system: 8%
- Update frequency: Annual (monitored continuously)

---

**CONSCIENCE Scoring Logic**

The six CORP indicators are weighted and combined to produce each company's individual CONSCIENCE score (0–100). Status thresholds:
- **BREACH (red):** Score 0–30. Company's own data shows systematic failure to meet own pledges.
- **WARNING (orange):** Score 31–60. Significant gaps between pledged and actual trajectory.
- **ON TRACK (green):** Score 61–100. Evidence of meaningful alignment between pledges and reported action.

Current CONSCIENCE Portfolio (March 2026):
ExxonMobil 8 · BP 11 · Shell 19 · Delta 14 · Starbucks 29 · Walmart 38 · Meta 43 · Amazon 47 · Microsoft 61 · Unilever 72 · Apple 84

The spread from 8 to 84 reflects the real variance in corporate climate accountability — not editorial opinion, but arithmetic applied to each company's own public filings.

---

## SECTION 4 — DATA INTEGRITY PRINCIPLES

1. **Source Sovereignty:** All VYRION indicators use data exclusively from named public government agencies, intergovernmental scientific bodies, or peer-reviewed academic institutions. No proprietary, paywalled, or anonymized data sources are used.

2. **Temporal Integrity:** Every daily score update is committed to the public GitHub repository with an immutable timestamp before the score is published. This creates a verifiable record that the methodology and data inputs preceded the output — preventing retroactive adjustment.

3. **Arithmetic Transparency:** All scoring functions are published openly. Any analyst can take the raw source data, apply the published formula, and independently reproduce the VYRION Index score. If they cannot, VYRION will publish the correction.

4. **Separation of Data and Opinion:** VYRION scores are derived mechanically from published data. Editorial commentary, where it appears, is explicitly labeled and separated from scored outputs. The data does not argue. It calculates.

5. **Revision Protocol:** When source agencies revise historical data (as they routinely do), VYRION will update the affected historical scores, publish a methodology note explaining the revision, and commit the change to the public repository with full documentation.

---

## SECTION 5 — OPEN PROOF PROTOCOL

VYRION's validation mechanism is radical transparency: the complete methodology, all 48 indicator sources, and all scoring functions are published openly. Any scientist, analyst, journalist, or institution can examine every number and challenge any input. This is not vulnerability — it is structural defense. An error found by an external party and corrected publicly strengthens the methodology's credibility; a closed methodology that resists scrutiny undermines it.

**The standing challenge:** *"Find the error. We will publish the correction."*

This distributed peer-review model is more robust than closed institutional review for a daily benchmark because it is continuous, adversarial, and operates in real time. Any institution paying to license VYRION data retains the right — and is encouraged — to audit the methodology and submit challenges directly.

---

## SECTION 6 — REPRODUCIBILITY STATEMENT

Any analyst with access to the internet and a spreadsheet can independently verify the VYRION Index score. Each of the 48 indicators lists its source agency, source URL, baseline value, current value, and scoring function. Applying the published within-system weights and system weights to independently sourced indicator readings should produce a score within ±0.5 of the published VYRION daily number; any larger discrepancy should be submitted as a methodology challenge.

---

## SECTION 7 — LIMITATIONS & REVISION PROCESS

**Current Limitations (Version 1.0):**
The VYRION Index v1.0 represents the best available daily public data across eight planetary systems. Some indicators (particularly biodiversity and soil) update annually rather than daily, meaning their contribution to the Index carries forward at the last recorded value between update cycles — this is noted for each indicator and does not affect the scientific validity of the composite score. Several indicators use proxy baselines (1955, 1970, 1981–2010) where pre-industrial data does not exist; these are explicitly documented and their limitations acknowledged.

**Revision Process:**
Indicators may be added, removed, or recalibrated as better public data sources become available. All revisions are versioned, documented, and committed to the public repository. The current version is v1.0. Institutions licensing VYRION data receive advance notice of any methodology revision that would produce a >0.5 point change in the Index.

---

## SECTION 8 — INSTITUTIONAL APPLICATIONS

The VYRION Index is designed as a data infrastructure layer — not a product, but a standard. Insurers (including Swiss Re, Munich Re) can use the VYRION Index as a sovereign and systemic climate risk input for catastrophe modeling and long-tail liability pricing. ESG platforms (Salesforce Sustainability Cloud, Bloomberg ESG Terminal, MSCI) can license the CONSCIENCE module and VYRION Index data feed as a verified, daily-updated accountability layer for corporate climate scoring. Government agencies and central banks can integrate the VYRION Index as a real-time planetary systems monitor for policy stress-testing and nature-related financial disclosure (TNFD) frameworks. Financial data terminals can carry the VYRION Index as a daily benchmark alongside traditional macroeconomic indicators — the first investable measure of planetary health.

---

## CLOSING STATEMENT

*The VYRION Index does not predict the future — it measures the present, precisely, every day, so that the gap between where we are and where we need to be is never a matter of opinion.*

---

**VYRION PBC — A Nexan Institute Company**
Founder: Tyler Frost / DablerFrost · Hilo, Hawaii
Platform: dablerfrost.github.io/conscience
Archive: dablerfrost.github.io/conscience/archive
GitHub: github.com/dablerfrost/conscience
Contact: contact@vyrion.earth
X: @DablerFrost · Instagram: @dablerfrost

*Established March 2026. Prior art timestamped publicly. Find the error. We will publish the correction.*
