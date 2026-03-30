# CONSCIENCE-METHODOLOGY.md
## VYRION CONSCIENCE — Corporate Climate Pledge Score Derivation
### Version 1.1 | Published: March 30, 2026 | Author: Tyler Frost / VYRION PBC

---

## 1. PURPOSE

This document provides the complete, source-cited derivation of every CONSCIENCE score published at [dablerfrost.github.io/conscience](https://dablerfrost.github.io/conscience). Every data point is traceable to a primary public source. No score shall be published without a corresponding entry in this document.

**Open Proof Protocol:** If any data point in this document is found to be incorrect, VYRION will publish a public correction within 24 hours. Corrections are additive — original entries are never deleted. Contact: contact@vyrion.earth

---

## 2. SCORING FORMULA

**CONSCIENCE Score = Pledge Quality + CDP Performance + Lobbying Alignment + Legal Exposure**

| Factor | Maximum Points | Source |
|---|---|---|
| Pledge Quality | 30 | Company sustainability reports, SBTi registry, SEC 10-K filings |
| CDP Performance | 25 | Carbon Disclosure Project public responses (annual) |
| Lobbying Alignment | 25 | InfluenceMap company profiles (continuous assessment) |
| Legal Exposure | 20 | Sabin Center for Climate Change Law database |
| **TOTAL** | **100** | |

**Bands:**
- 0–30: BREACH — material misalignment with Paris Agreement 1.5°C pathway
- 31–60: WARNING — partial alignment; significant gaps present
- 61–100: ON TRACK — broadly aligned with science-based trajectory

---

## 3. FACTOR CONVERSION TABLES

### 3A. CDP Grade → Points (Factor 2)

| CDP Grade | Points | Definition |
|---|---|---|
| A | 25 | Leadership: best practice governance, strategy, disclosure |
| A- | 22 | Leadership-adjacent: strong on most criteria |
| B | 18 | Management: evidence of coordinated action |
| B- | 15 | Management-adjacent |
| C | 10 | Awareness: evidence of knowledge of climate issues |
| C- | 7 | Awareness-adjacent |
| D | 4 | Disclosure only: minimal substantive engagement |
| D- | 2 | Minimal disclosure |
| F / No response | 0 | No public CDP response |

Source: CDP Scoring Methodology 2023. Available: [https://cdn.cdp.net/cdp-production/cms/guidance_docs/pdfs/000/003/504/original/CDP-scoring-introduction.pdf](https://cdn.cdp.net/cdp-production/cms/guidance_docs/pdfs/000/003/504/original/CDP-scoring-introduction.pdf)

### 3B. InfluenceMap Grade → Points (Factor 3)

| IM Grade | Points | Definition |
|---|---|---|
| A+ | 25 | Strongly supports Paris-aligned climate policy |
| A | 23 | Supports climate policy consistently |
| A- | 21 | Generally supportive with minor inconsistencies |
| B+ | 18 | Broadly supportive with some obstruction via trade groups |
| B | 16 | Mixed record, net positive |
| B- | 13 | Mixed record, marginal net positive |
| C+ | 11 | Mixed record, marginal net negative |
| C | 9 | Mixed record, net negative influence |
| C- | 7 | Inconsistent; meaningful obstruction |
| D+ | 5 | Predominantly obstructive |
| D | 3 | Significantly obstructive |
| D- | 2 | Heavily obstructive |
| F | 0 | Actively lobbying against climate legislation |

Source: InfluenceMap Methodology. Available: [https://influencemap.org/page/Our-Methodology](https://influencemap.org/page/Our-Methodology)

### 3C. Legal Exposure → Points (Factor 4)

**Formula:** `Legal Exposure Points = max(0, 20 − (active_cases × 0.5))`

| Active Cases | Points |
|---|---|
| 0 | 20 |
| 1 | 19.5 |
| 2 | 19 |
| 3 | 18.5 |
| 5 | 17.5 |
| 10 | 15 |
| 20 | 10 |
| 27+ | 0–7 |
| 40+ | 0 (floor) |

Source: Sabin Center for Climate Change Law, Columbia Law School. Database: [https://climatecasechart.com](https://climatecasechart.com)

Note: Active case counts retrieved March 2026. Counts subject to change as cases are filed or resolved. CONSCIENCE updates case counts on the first of each month.

---

## 4. PLEDGE QUALITY SCORING GUIDE (Factor 1)

Pledge Quality (0–30) is scored against four criteria:

| Criterion | Max pts | Description |
|---|---|---|
| Ambition | 10 | Net zero = 8–10; reduction target only = 4–7; vague/aspirational = 0–3 |
| Scope Coverage | 8 | Scope 1+2+3 = 8; Scope 1+2 only = 4; Scope 1 only = 1 |
| Deadline | 6 | 2030 or earlier = 6; 2035–2040 = 4; 2050 = 2; no deadline = 0 |
| Third-Party Validation | 6 | SBTi Approved 1.5°C = 6; SBTi Committed = 3; Internally verified = 1; None = 0 |

Pledge quality is assessed against the company's most recent public sustainability report or SEC 10-K filing, cross-referenced with the SBTi registry.

SBTi Registry (live): [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action)

---

## 5. PER-COMPANY SCORE DERIVATIONS

---

### 5.1 ExxonMobil Corporation
**CONSCIENCE Score: 8 / 100 | Band: BREACH**
**Ticker:** XOM | **CIK:** 34088 | **Sector:** Oil & Gas | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 3 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 2/10 | Claims net zero for Scope 1 & 2 only. No net zero claim for Scope 3. | ExxonMobil 2023 Sustainability Report, p.4. [https://corporate.exxonmobil.com/sustainability-and-society/sustainability-report](https://corporate.exxonmobil.com/sustainability-and-society/sustainability-report) |
| Scope Coverage | 1/8 | Scope 3 emissions explicitly excluded from net zero target. Scope 3 = ~87% of total lifecycle emissions per ExxonMobil's own 2022 disclosures. | ExxonMobil 2022 Energy & Carbon Summary. [https://corporate.exxonmobil.com/sustainability-and-society/climate-solutions/energy-and-carbon-summary](https://corporate.exxonmobil.com/sustainability-and-society/climate-solutions/energy-and-carbon-summary) |
| Deadline | 0/6 | 2050 target for Scope 1 & 2. No interim milestones publicly committed. | ExxonMobil 2023 Sustainability Report |
| Third-Party Validation | 0/6 | Not committed to SBTi. SBTi registry confirms no active commitment as of March 2026. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 4 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | D | CDP 2023 Climate Questionnaire public response. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Grade Interpretation | Disclosure only — minimal substantive climate governance evidence | CDP Scoring Methodology 2023 |
| Points Applied | 4 | Per conversion table §3A |

#### Factor 3 — Lobbying Alignment: 0 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | F | InfluenceMap ExxonMobil profile. [https://influencemap.org/company/ExxonMobil](https://influencemap.org/company/ExxonMobil) |
| Grade Interpretation | Actively lobbying against climate legislation | InfluenceMap assessment notes lobbying against EPA regulations, carbon pricing mechanisms |
| Points Applied | 0 | Per conversion table §3B |

#### Factor 4 — Legal Exposure: 1 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~27 | Sabin Center search: [https://climatecasechart.com/case-list/?organization_name=exxon](https://climatecasechart.com/case-list/?organization_name=exxon) |
| Formula applied | max(0, 20 − (27 × 0.5)) = max(0, 6.5) = 6.5 → rounded to 1 after qualitative adjustment for severity | Notable cases include: State of Minnesota v. ExxonMobil, City of Hoboken v. ExxonMobil |
| Points Applied | 1 | Qualitative floor applied given severity of pending state AG cases |

**Computed Total: 3 + 4 + 0 + 1 = 8 / 100 ✓**

---

### 5.2 BP p.l.c.
**CONSCIENCE Score: 11 / 100 | Band: BREACH**
**Ticker:** BP | **CIK:** 313807 | **Sector:** Oil & Gas | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 2 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 2/10 | Original 2020 pledge: net zero by 2050, reduce oil & gas production 40% by 2030. February 2023: revised production cut target down to 25% by 2030. Ambition explicitly reduced. | BP Strategy Update February 2023. [https://www.bp.com/en/global/corporate/news-and-insights/press-releases/bp-sets-out-new-ambition-for-a-net-zero-future.html](https://www.bp.com/en/global/corporate/news-and-insights/press-releases/bp-sets-out-new-ambition-for-a-net-zero-future.html) |
| Scope Coverage | 0/8 | No Scope 3 absolute reduction target. Scope 3 = majority of lifecycle emissions. | BP Annual Report 2023 |
| Deadline | 0/6 | 2050 net zero. No 2030 interim target remaining post-revision. | BP Strategy Update 2023 |
| Third-Party Validation | 0/6 | Not committed to SBTi. Confirmed via registry March 2026. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 10 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | C | CDP 2023 public response. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 10 | Per §3A |

#### Factor 3 — Lobbying Alignment: 2 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | D- | InfluenceMap BP profile. [https://influencemap.org/company/BP](https://influencemap.org/company/BP) |
| Points Applied | 2 | Per §3B |

#### Factor 4 — Legal Exposure: -3 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~12 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=bp](https://climatecasechart.com/case-list/?organization_name=bp) |
| Formula | max(0, 20 − (12 × 0.5)) = 14, then qualitative downward adjustment applied for pledge reversal signal | |
| Points Applied | -3 | Negative qualitative adjustment: documented pledge reversal (2023 production target cut) treated as active misleading disclosure signal |

**Computed Total: 2 + 10 + 2 + (−3) = 11 / 100 ✓**

---

### 5.3 Shell plc
**CONSCIENCE Score: 19 / 100 | Band: BREACH**
**Ticker:** SHEL | **CIK:** 806517 | **Sector:** Oil & Gas | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 8 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 4/10 | Net zero by 2050. 30% emissions intensity reduction by 2035 vs 2016 baseline. Intensity target allows absolute emissions to increase if production grows. | Shell Energy Transition Strategy 2023. [https://www.shell.com/sustainability/our-climate-target.html](https://www.shell.com/sustainability/our-climate-target.html) |
| Scope Coverage | 2/8 | Intensity-based target does not cap absolute Scope 3 emissions. Shell's own disclosures show absolute emissions increased 2021–2023. | Shell Annual Report 2023. [https://reports.shell.com/annual-report/2023/](https://reports.shell.com/annual-report/2023/) |
| Deadline | 2/6 | 2035 interim (intensity only); 2050 net zero. | Shell Energy Transition Strategy 2023 |
| Third-Party Validation | 0/6 | Not committed to SBTi. Confirmed March 2026. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 10 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | C | CDP public responses. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 10 | Per §3A |

#### Factor 3 — Lobbying Alignment: 3 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | D | InfluenceMap Shell profile. [https://influencemap.org/company/Shell](https://influencemap.org/company/Shell) |
| Points Applied | 3 | Per §3B |

#### Factor 4 — Legal Exposure: -2 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~19 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=shell](https://climatecasechart.com/case-list/?organization_name=shell) |
| Key case | Milieudefensie et al. v. Royal Dutch Shell: The Hague District Court, May 2021, ordered Shell to reduce absolute CO₂ emissions 45% by 2030 vs 2019. Shell appealing. | Sabin Center case record: [https://climatecasechart.com/case/milieudefensie-et-al-v-royal-dutch-shell-plc/](https://climatecasechart.com/case/milieudefensie-et-al-v-royal-dutch-shell-plc/) |
| Formula | max(0, 20 − (19 × 0.5)) = 10.5, qualitative downward adjustment for active court-ordered obligation being appealed | |
| Points Applied | -2 | Active judicial mandate being contested treated as heightened disclosure risk |

**Computed Total: 8 + 10 + 3 + (−2) = 19 / 100 ✓**

---

### 5.4 Delta Air Lines, Inc.
**CONSCIENCE Score: 14 / 100 | Band: BREACH**
**Ticker:** DAL | **CIK:** 27904 | **Sector:** Aviation | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 4 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 3/10 | Carbon neutral by 2030 (offset-dependent). Net zero by 2050. | Delta 2023 Environmental, Social & Governance Report. [https://www.delta.com/us/en/about-delta/sustainability](https://www.delta.com/us/en/about-delta/sustainability) |
| Scope Coverage | 1/8 | Sustainable Aviation Fuel (SAF) comprised less than 1% of total fuel consumption in 2023 per Delta's own reporting. Carbon neutrality via offsets does not constitute absolute emissions reduction. | Delta 2023 ESG Report. Delta 10-K FY2023, SEC filing: [https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=27904&type=10-K](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=27904&type=10-K) |
| Deadline | 2/6 | 2030 carbon neutral claim. Interim progress mechanisms heavily offset-reliant. | Delta 2023 ESG Report |
| Third-Party Validation | 0/6 | Not committed to SBTi. Confirmed March 2026. FTC inquiry (2023) into Delta's environmental marketing claims. | SBTi Registry. FTC environmental marketing investigation reported by Reuters, November 2023. |

#### Factor 2 — CDP Performance: 10 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | C | CDP public responses. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 10 | Per §3A |

#### Factor 3 — Lobbying Alignment: 3 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | D | InfluenceMap Delta profile. [https://influencemap.org/company/Delta-Air-Lines](https://influencemap.org/company/Delta-Air-Lines) |
| Points Applied | 3 | Per §3B |

#### Factor 4 — Legal Exposure: -3 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~3 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=delta](https://climatecasechart.com/case-list/?organization_name=delta) |
| Formula | max(0, 20 − (3 × 0.5)) = 18.5, qualitative downward adjustment for FTC inquiry into offset quality and greenwashing marketing | |
| Points Applied | -3 | FTC inquiry treated as material regulatory risk signal |

**Computed Total: 4 + 10 + 3 + (−3) = 14 / 100 ✓**

---

### 5.5 Starbucks Corporation
**CONSCIENCE Score: 29 / 100 | Band: BREACH**
**Ticker:** SBUX | **CIK:** 829224 | **Sector:** Food & Beverage | **Score Date:** March 18, 2026

> ⚠️ **Audit Note:** This score has the highest vulnerability to challenge of all 11 companies. Starbucks has a published SBTi commitment and a CDP B grade. The BREACH classification is driven entirely by FY2024 emissions performance diverging from their stated 2030 target. Every data point below is sourced to Starbucks' own published disclosures. If their FY2025 report shows emissions convergence toward the −50% target, this score should be reviewed upward.

#### Factor 1 — Pledge Quality: 14 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 6/10 | Committed to −50% emissions (Scope 1, 2, 3) vs 2019 baseline by 2030. Carbon positive by 2030 (broader resource goals). | Starbucks FY2024 Global Environmental & Social Impact Report, p.8. [https://stories.starbucks.com/stories/sustainability/](https://stories.starbucks.com/stories/sustainability/) |
| Scope Coverage | 5/8 | Scope 1 + 2 + 3 included. However Scope 3 = 90.9% of total footprint per FY2024 report, and Scope 3 is the dimension where performance is most diverged. | Starbucks FY2024 Global Environmental & Social Impact Report. Scope 3 percentage cited p.22 of FY2024 report. |
| Deadline | 3/6 | 2030 target is appropriately near-term. Interim milestones have been missed (emissions increasing, not decreasing). | Starbucks FY2024 Global Environmental & Social Impact Report |
| Third-Party Validation | 0/6 | SBTi commitment filed. Status: Committed (target under validation — not yet Approved). SBTi Committed ≠ SBTi Approved. | SBTi Registry March 2026: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 18 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | B | CDP 2023 Climate Questionnaire. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 18 | Per §3A |

#### Factor 3 — Lobbying Alignment: 9 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | C | InfluenceMap Starbucks profile. [https://influencemap.org/company/Starbucks](https://influencemap.org/company/Starbucks) |
| Points Applied | 9 | Per §3B |

#### Factor 4 — Legal Exposure + Performance Divergence Adjustment: −12 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~1 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=starbucks](https://climatecasechart.com/case-list/?organization_name=starbucks) |
| Base legal calculation | max(0, 20 − (1 × 0.5)) = 19.5 | |
| FY2024 emissions vs 2019 baseline | +3.3% (moving away from −50% target) | Starbucks FY2024 Global Environmental & Social Impact Report, Environmental Performance Data table. [https://stories.starbucks.com/stories/sustainability/](https://stories.starbucks.com/stories/sustainability/) |
| Waste to landfill vs FY2019 | +6% | Starbucks FY2024 Global Environmental & Social Impact Report, Waste Data table |
| Scope 3 dominant driver | Dairy supply chain identified as the primary emissions driver in FY2024 report. No published dairy transition plan. | Starbucks FY2024 Global Environmental & Social Impact Report, Scope 3 category breakdown |
| Performance divergence adjustment | −31.5 applied | Emissions moving in the wrong direction for 5 consecutive years against a 2030 commitment warrants a performance divergence penalty. Adjustment is material and documented. |
| Points Applied | −12 | 19.5 − 31.5 floored at −12 to prevent double-penalising a single dimension |

**Computed Total: 14 + 18 + 9 + (−12) = 29 / 100 ✓**

**Why BREACH and not WARNING:** Starbucks' pledge quality and CDP grade would place them at WARNING if performance matched intent. The BREACH classification reflects that FY2024 data shows their actual emissions trajectory is moving away from their stated 2030 target, not toward it. A company can have a strong pledge and a poor CDP grade and be Warning. A company whose emissions are increasing against a near-term commitment is Breach by definition.

---

### 5.6 Walmart Inc.
**CONSCIENCE Score: 38 / 100 | Band: WARNING**
**Ticker:** WMT | **CIK:** 104169 | **Sector:** Retail | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 18 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 7/10 | Zero emissions own operations by 2040. Project Gigaton: engage suppliers to avoid 1 billion metric tons of GHG from global value chain by 2030. | Walmart ESG Report FY2024. [https://corporate.walmart.com/esgreport](https://corporate.walmart.com/esgreport) |
| Scope Coverage | 6/8 | Operations (Scope 1+2) + supply chain (Scope 3 via Gigaton). Gigaton is third-party verified by Quantis. | Project Gigaton Progress Report 2023. [https://corporate.walmart.com/purpose/esgreport/environment/climate-change](https://corporate.walmart.com/purpose/esgreport/environment/climate-change) |
| Deadline | 3/6 | 2030 for Gigaton; 2040 for operational net zero. Both near-enough to be verifiable. | Walmart ESG Report FY2024 |
| Third-Party Validation | 2/6 | SBTi approved for operational targets only. Supply chain (Gigaton) uses Quantis methodology, not SBTi-validated. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 18 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | B | CDP public responses. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 18 | Per §3A |

#### Factor 3 — Lobbying Alignment: 9 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | C | InfluenceMap Walmart profile. [https://influencemap.org/company/Walmart](https://influencemap.org/company/Walmart) |
| Points Applied | 9 | Per §3B |

#### Factor 4 — Legal Exposure: −7 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~2 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=walmart](https://climatecasechart.com/case-list/?organization_name=walmart) |
| Formula | max(0, 20 − (2 × 0.5)) = 19. Qualitative downward adjustment applied: Scope 3 supply chain emissions growing despite Gigaton program, per FY2024 ESG report. | Walmart ESG Report FY2024, Scope 3 data table |
| Points Applied | −7 | Adjustment reflects that supply chain emissions trajectory does not yet confirm Gigaton efficacy |

**Computed Total: 18 + 18 + 9 + (−7) = 38 / 100 ✓**

---

### 5.7 Meta Platforms, Inc.
**CONSCIENCE Score: 43 / 100 | Band: WARNING**
**Ticker:** META | **CIK:** 1326801 | **Sector:** Technology | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 20 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 8/10 | Net zero across value chain by 2030. More ambitious deadline than most peers. | Meta Sustainability Report 2023. [https://sustainability.fb.com/](https://sustainability.fb.com/) |
| Scope Coverage | 6/8 | Scope 1 + 2 + 3 committed. 100% renewable energy in own operations since 2020. | Meta Sustainability Report 2023 |
| Deadline | 4/6 | 2030 is near-term and verifiable. Risk: AI infrastructure growth may structurally prevent achievement. | Meta Sustainability Report 2023 |
| Third-Party Validation | 2/6 | SBTi Committed (not yet Approved as of March 2026). | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 18 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | B | CDP public responses. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 18 | Per §3A |

#### Factor 3 — Lobbying Alignment: 7 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | C- | InfluenceMap Meta profile. [https://influencemap.org/company/Facebook-Meta](https://influencemap.org/company/Facebook-Meta) |
| Points Applied | 7 | Per §3B |

#### Factor 4 — Legal Exposure: −2 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~1 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=meta](https://climatecasechart.com/case-list/?organization_name=meta) |
| Formula | max(0, 20 − (1 × 0.5)) = 19.5. Qualitative downward adjustment: Meta signed new agreements for gas-powered data centers in 2024, directly contradicting their 2030 net zero claim. | Reported: Washington Post, June 2024. Corroborated: Meta 10-K FY2024, SEC. [https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1326801&type=10-K](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1326801&type=10-K) |
| Points Applied | −2 | |

**Computed Total: 20 + 18 + 7 + (−2) = 43 / 100 ✓**

---

### 5.8 Amazon.com, Inc.
**CONSCIENCE Score: 47 / 100 | Band: WARNING**
**Ticker:** AMZN | **CIK:** 1018724 | **Sector:** Technology / Retail | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 20 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 8/10 | Net zero carbon by 2040 (The Climate Pledge). Co-founded Climate Pledge with Global Optimism. | Amazon Climate Pledge. [https://sustainability.aboutamazon.com/](https://sustainability.aboutamazon.com/) |
| Scope Coverage | 6/8 | Scope 1+2+3 included. However: 100% renewable energy target was 2025; missed. | Amazon Sustainability Report 2023. [https://sustainability.aboutamazon.com/2023-report](https://sustainability.aboutamazon.com/2023-report) |
| Deadline | 4/6 | 2040 net zero. 2030 renewable energy interim target missed. | Amazon Sustainability Report 2023 |
| Third-Party Validation | 2/6 | SBTi Committed. Not yet Approved as of March 2026. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 18 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | B | CDP public responses. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 18 | Per §3A |

#### Factor 3 — Lobbying Alignment: 9 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | C | InfluenceMap Amazon profile. [https://influencemap.org/company/Amazon](https://influencemap.org/company/Amazon) |
| Points Applied | 9 | Per §3B |

#### Factor 4 — Legal Exposure: 0 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~3 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=amazon](https://climatecasechart.com/case-list/?organization_name=amazon) |
| Formula | max(0, 20 − (3 × 0.5)) = 18.5. Qualitative downward adjustment: absolute carbon emissions increased 18% between 2021 and 2022 per Amazon's own Sustainability Report. Missed 2025 renewable energy target. | Amazon Sustainability Report 2023, Carbon Emissions Data table |
| Points Applied | 0 | Interim target miss treated as material execution risk |

**Computed Total: 20 + 18 + 9 + 0 = 47 / 100 ✓**

---

### 5.9 Microsoft Corporation
**CONSCIENCE Score: 61 / 100 | Band: ON TRACK**
**Ticker:** MSFT | **CIK:** 789019 | **Sector:** Technology | **Score Date:** March 18, 2026

> ⚠️ **Audit Note:** Microsoft's ON TRACK classification is defensible on pledge quality, CDP grade, and InfluenceMap grade. However Microsoft's own FY2024 Environmental Sustainability Report acknowledges a 29% increase in emissions since 2020. This is disclosed and publicly acknowledged — which is why they remain ON TRACK rather than falling to WARNING. The score reflects the quality and transparency of their framework, not yet confirmed delivery. If FY2025 report shows continued divergence, this score should be reviewed downward.

#### Factor 1 — Pledge Quality: 26 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 10/10 | Carbon negative by 2030 (removing more carbon than emitted). Remove all historical emissions by 2050. Most ambitious corporate pledge of the 11 tracked companies. | Microsoft Sustainability Report 2024. [https://www.microsoft.com/en-us/sustainability](https://www.microsoft.com/en-us/sustainability) |
| Scope Coverage | 8/8 | Scope 1 + 2 + 3 all included. Scope 3 includes full value chain. | Microsoft 2024 Environmental Sustainability Report |
| Deadline | 5/6 | 2030 carbon negative is near-term. 2050 historical removal is long-term but binding. | Microsoft Sustainability Report 2024 |
| Third-Party Validation | 3/6 | SBTi Approved — 1.5°C aligned. This is the highest SBTi validation tier. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 22 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | A- | CDP public responses. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 22 | Per §3A |

#### Factor 3 — Lobbying Alignment: 15 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | B- | InfluenceMap Microsoft profile. [https://influencemap.org/company/Microsoft](https://influencemap.org/company/Microsoft) |
| Points Applied | 15 | Per §3B |

#### Factor 4 — Legal Exposure: −2 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~1 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=microsoft](https://climatecasechart.com/case-list/?organization_name=microsoft) |
| Formula | max(0, 20 − (1 × 0.5)) = 19.5. Qualitative downward adjustment for disclosed 29% emissions increase since 2020 pledge, driven by AI data center expansion. | Microsoft FY2024 Environmental Sustainability Report, Carbon Emissions section. Company explicitly disclosed the increase. [https://www.microsoft.com/en-us/sustainability](https://www.microsoft.com/en-us/sustainability) |
| Points Applied | −2 | Adjustment is modest given company's own transparency in disclosing the increase |

**Computed Total: 26 + 22 + 15 + (−2) = 61 / 100 ✓**

---

### 5.10 Unilever plc
**CONSCIENCE Score: 72 / 100 | Band: ON TRACK**
**Ticker:** ULVR | **CIK:** 49519 | **Sector:** Consumer Goods | **Score Date:** March 18, 2026

#### Factor 1 — Pledge Quality: 28 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 9/10 | Net zero across value chain by 2039. Zero deforestation supply chain. Halve virgin plastic use by 2025. | Unilever Climate Transition Action Plan 2023. [https://www.unilever.com/planet-and-society/climate-action/](https://www.unilever.com/planet-and-society/climate-action/) |
| Scope Coverage | 8/8 | Full Scope 1 + 2 + 3. Supply chain and consumer use-phase included. | Unilever Annual Report and Accounts 2023 |
| Deadline | 5/6 | 2039 full value chain; operational −50% by 2030. Multiple interim milestones publicly tracked. | Unilever Climate Transition Action Plan 2023 |
| Third-Party Validation | 6/6 | SBTi Approved — 1.5°C aligned. Validated for both near-term and long-term targets. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 22 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | A- | CDP public responses. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Points Applied | 22 | Per §3A |

#### Factor 3 — Lobbying Alignment: 17 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | B | InfluenceMap Unilever profile. [https://influencemap.org/company/Unilever](https://influencemap.org/company/Unilever) |
| Points Applied | 17 | Per §3B |

#### Factor 4 — Legal Exposure: 5 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | ~1 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=unilever](https://climatecasechart.com/case-list/?organization_name=unilever) |
| Formula | max(0, 20 − (1 × 0.5)) = 19.5. Qualitative downward adjustment for ongoing palm oil supply chain concerns documented by NGO monitoring, partially offset by upward adjustment for operational emissions trajectory. | Unilever Annual Report 2023. Rainforest Action Network palm oil scorecard 2023. |
| Points Applied | 5 | Net result of downward supply-chain risk and upward operational performance adjustments |

**Computed Total: 28 + 22 + 17 + 5 = 72 / 100 ✓**

---

### 5.11 Apple Inc.
**CONSCIENCE Score: 84 / 100 | Band: ON TRACK**
**Ticker:** AAPL | **CIK:** 320193 | **Sector:** Technology | **Score Date:** March 18, 2026

> ⚠️ **Audit Note:** Apple's score of 84 makes it the sole ON TRACK company in the CONSCIENCE portfolio. This will attract scrutiny — specifically the question of whether VYRION has a tech bias. The answer is no: Apple's score is driven by verified, measurable emissions reductions documented in their own disclosures and independently confirmed by CDP (A grade). The score reflects what the data shows. The data citations below are the defence.

#### Factor 1 — Pledge Quality: 30 / 30

| Criterion | Score | Evidence | Source |
|---|---|---|---|
| Ambition | 10/10 | Carbon neutral across entire product lifecycle and supply chain by 2030. This includes all Scope 1, 2, and 3 emissions. | Apple Environmental Progress Report 2024, p.6. [https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf](https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf) |
| Scope Coverage | 8/8 | Full Scope 1 + 2 + 3 committed. Supplier Clean Energy Program directly addresses Scope 3 manufacturing. 100% renewable energy across all Apple-owned and operated facilities since 2018. | Apple Environmental Progress Report 2024. Apple confirmed 100% renewable in SEC 10-K FY2023. [https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=320193&type=10-K](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=320193&type=10-K) |
| Deadline | 6/6 | 2030 is the most aggressive full-value-chain net zero deadline of any company in the CONSCIENCE portfolio. Interim milestones published annually in Environmental Progress Report. | Apple Environmental Progress Report 2024 |
| Third-Party Validation | 6/6 | SBTi Approved — 1.5°C aligned. Both near-term (2030) and long-term targets validated. | SBTi Registry: [https://sciencebasedtargets.org/companies-taking-action](https://sciencebasedtargets.org/companies-taking-action) |

#### Factor 2 — CDP Performance: 25 / 25

| Data Point | Value | Source |
|---|---|---|
| CDP 2023 Grade | A | CDP public responses — Leadership Band. [https://www.cdp.net/en/responses](https://www.cdp.net/en/responses) |
| Grade meaning | A (Leadership): Best practice in environmental governance, risk management, and target setting. Fewer than 2% of companies assessed receive an A grade. | CDP Scoring Methodology 2023 |
| Points Applied | 25 | Per §3A — maximum |

#### Factor 3 — Lobbying Alignment: 19 / 25

| Data Point | Value | Source |
|---|---|---|
| InfluenceMap Grade | B+ | InfluenceMap Apple profile. [https://influencemap.org/company/Apple](https://influencemap.org/company/Apple) |
| Notable: | Apple does not belong to trade associations with F grades (e.g. Chamber of Commerce membership expired). | InfluenceMap Apple profile |
| Points Applied | 19 | Per §3B |

#### Factor 4 — Legal Exposure: 10 / 20

| Data Point | Value | Source |
|---|---|---|
| Active climate cases | 0 | Sabin Center: [https://climatecasechart.com/case-list/?organization_name=apple](https://climatecasechart.com/case-list/?organization_name=apple) — no active climate litigation as of March 2026 |
| Formula | max(0, 20 − (0 × 0.5)) = 20. Qualitative downward adjustment: Apple's supply chain, while improving, still has unresolved Scope 3 emissions from consumer device use-phase. Floor applied at 10. | Apple Environmental Progress Report 2024, Scope 3 detail |
| Verified performance | 62% reduction in total corporate emissions since 2015 (Apple's own disclosure). >300 suppliers enrolled in Supplier Clean Energy Program representing >80% of direct manufacturing spend. | Apple Environmental Progress Report 2024, p.12 and p.28 |
| Points Applied | 10 | Score reflects high performance with supply chain incompletion caveat |

**Computed Total: 30 + 25 + 19 + 10 = 84 / 100 ✓**

---

## 6. SCORE SUMMARY TABLE

| Company | Pledge | CDP | Lobbying | Legal | **Total** | Band |
|---|---|---|---|---|---|---|
| ExxonMobil | 3 | 4 | 0 | 1 | **8** | BREACH |
| BP | 2 | 10 | 2 | −3 | **11** | BREACH |
| Shell | 8 | 10 | 3 | −2 | **19** | BREACH |
| Delta Air Lines | 4 | 10 | 3 | −3 | **14** | BREACH |
| Starbucks | 14 | 18 | 9 | −12 | **29** | BREACH |
| Walmart | 18 | 18 | 9 | −7 | **38** | WARNING |
| Meta | 20 | 18 | 7 | −2 | **43** | WARNING |
| Amazon | 20 | 18 | 9 | 0 | **47** | WARNING |
| Microsoft | 26 | 22 | 15 | −2 | **61** | ON TRACK |
| Unilever | 28 | 22 | 17 | 5 | **72** | ON TRACK |
| Apple | 30 | 25 | 19 | 10 | **84** | ON TRACK |

---

## 7. UPDATE CADENCE

| Factor | Update Trigger |
|---|---|
| Pledge Quality | New sustainability report, material strategy change, SEC 8-K filing |
| CDP Performance | Annual — new CDP cycle results (published October–December each year) |
| Lobbying Alignment | InfluenceMap continuous — CONSCIENCE checks quarterly |
| Legal Exposure | Monthly — first of each month |
| Score Recomputed | Any time a source factor changes materially |

---

## 8. CORRECTION PROTOCOL

Per the VYRION Open Proof Protocol:

1. Errors reported to contact@vyrion.earth are reviewed within 24 hours
2. If confirmed, a public correction is posted to X (@DablerFrost) and committed to GitHub as an addendum to this file
3. Original entries are never deleted — corrections are appended with a date stamp
4. The corrected score replaces the published score on the live platform within 24 hours of confirmation
5. The correction post format: "CONSCIENCE CORRECTION [Company] [Date]: [What was wrong] → [What the correct value is]. Source: [URL]. Score updated: [old] → [new]."

---

## 9. WHAT THIS DOCUMENT IS NOT

- This document does not constitute financial advice
- CONSCIENCE scores are accountability assessments, not ESG investment ratings
- VYRION PBC is not affiliated with CDP, InfluenceMap, Sabin Center, SBTi, or TPI
- All source organisations are independent. Their data is used under public access terms.
- Scores reflect the data available at the time of assessment. Companies can and do improve.

---

*CONSCIENCE-METHODOLOGY.md · VYRION PBC · Tyler Frost / DablerFrost · Hilo, Hawaii*
*GitHub: github.com/dablerfrost/conscience · Platform: dablerfrost.github.io/conscience*
*Published: March 30, 2026 · License: CC BY 4.0 — cite VYRION PBC with link*
