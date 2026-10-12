# CONSCIENCE-METHODOLOGY.md
## Per-Company Score Derivation · v1.2 · October 10, 2026
## VYRION LLC · Open Proof Protocol

**Platform:** https://Vyrion.earth  
**Errors:** contact@vyrion.earth → correction published within 24 hours  
**Prior art:** github.com/dablerfrost/Vyrion (timestamped March 18, 2026)

---

## Scoring Framework

CONSCIENCE scores use a 0–100 scale computed from four weighted factors, each sourced from independent public data:

| Factor | Max Points | Source | Scoring Logic |
|--------|-----------|--------|---------------|
| **Pledge Quality** | 30 | Company sustainability filings · SBTi registry | Assessed on: (1) ambition level vs 1.5°C pathway, (2) scope coverage (1/2/3), (3) target deadline, (4) third-party validation status |
| **CDP Performance** | 25 | CDP 2023 public responses | A = 25 · A− = 22 · B = 18 · B− = 14 · C = 10 · C− = 7 · D = 4 · D− = 2 · F = 0 |
| **Lobbying Alignment** | 25 | InfluenceMap corporate profiles | A+ = 25 · A = 22 · B+ = 19 · B = 16 · B- = 13 · C+ = 11 · C = 9 · C- = 7 · D+ = 5 · D = 3 · D- = 2 · F = 0. Negative scores applied where lobbying actively obstructs climate legislation. |
| **Legal Exposure** | 20 | Sabin Center for Climate Change Law · Columbia University | Formula: Base 20 − (0.5 × active cases). Floor = 0. Adjusted upward or downward for severity of pending rulings and FTC/regulatory actions. |

**Band thresholds:**
- **BREACH:** 0–30 — Material misalignment with Paris Agreement 1.5°C pathways
- **WARNING:** 31–60 — Partial alignment; significant gaps in scope, performance, or lobbying
- **ON TRACK:** 61–100 — Verified alignment with science-based 1.5°C trajectory

**Basis:** Paris Agreement 1.5°C pathways · Science Based Targets initiative criteria  
**Score version:** v1.1 · CDP scale upgraded May 5, 2026 · All baseline company scores unchanged from v1.0 (March 18, 2026)  
**Update triggers:** CDP annual cycle · SBTi registry updates · Sabin Center litigation DB · SEC EDGAR annual filings · InfluenceMap reassessments

---

## Company Score Derivations

---

### ExxonMobil (XOM) · Score: 8/100 · BREACH

**Pledge Quality: 3 / 30**

ExxonMobil's stated climate commitment covers Scope 1 and 2 emissions only — a net-zero by 2050 pledge that excludes Scope 3, which constitutes approximately 99% of the company's total lifecycle emissions. The dominant category is the combustion of sold products (oil and gas burned by customers globally). A pledge that excludes 99% of actual emissions does not constitute alignment with Paris Agreement 1.5°C pathways, which require economy-wide absolute reductions across all emission scopes. No SBTi commitment has been filed. Production expansion plans extend through 2028.

Source: ExxonMobil 2023 Sustainability Report — https://corporate.exxonmobil.com/sustainability-and-society/sustainability-report

**CDP Performance: 4 / 25**

CDP 2023 grade: D. Disclosure-only tier — the lowest active participation level. Grade D reflects disclosure of some climate information without demonstrated governance integration, strategic action, or credible reduction plans. Fewer than 2% of CDP respondents receive grade A (Leadership). Grade D respondents are in the initial disclosure phase.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 0 / 25**

InfluenceMap grade: F. ExxonMobil receives the lowest possible lobbying alignment score. InfluenceMap documents active lobbying against climate legislation including opposition to carbon pricing mechanisms, clean energy standards, and EPA regulatory authority. Lobbying spend directed against climate policy exceeded $7M in 2023. A company cannot credibly commit to net zero while financially supporting obstruction of the regulatory framework required to achieve net zero. This contradiction is a core CONSCIENCE signal.

Source: InfluenceMap — https://influencemap.org/company/ExxonMobil

**Legal Exposure: 1 / 20**

Sabin Center active cases: 27. Formula: 20 − (0.5 × 27) = 6.5. Score adjusted to 1 reflecting severity of active litigation including state attorney general investigations, investor fraud claims related to climate risk disclosure, and international cases. 27 active cases represents one of the highest climate litigation exposure levels of any company in the CONSCIENCE portfolio. This volume indicates pledge-vs-reality gaps that governments, institutional investors, and civil society organizations have found legally actionable.

Source: Sabin Center for Climate Change Law — https://climatecasechart.com/case-list/?organization_name=exxon

**Computed Total: 8 / 100 · BREACH**

---

### BP (BP) · Score: 11/100 · BREACH

**Pledge Quality: 2 / 30**

BP announced a net-zero-by-2050 ambition in 2020, with an accompanying target to cut oil and gas production 40% by 2030. In 2023, under investor pressure citing lower returns, BP revised the 2030 production cut target down to 25% and signaled continued upstream investment. This reversal of a stated interim target within three years of announcement is a material credibility event. The remaining pledge lacks SBTi validation and has no Scope 3 absolute reduction target. Score reflects the backtracked ambition level.

Source: BP Strategy Update 2023 — https://www.bp.com/en/global/corporate/news-and-insights/press-releases/bp-sets-out-new-ambition-for-a-net-zero-future.html

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Awareness tier. BP demonstrates basic climate risk awareness and reporting but lacks the governance integration and strategic ambition required for Management (B) or Leadership (A) tier. The C grade is consistent with companies that report climate data without embedding it in core business strategy.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 2 / 25**

InfluenceMap grade: D−. BP engages in lobbying that is partially supportive of some climate policies while simultaneously supporting industry associations that actively obstruct more ambitious climate regulation. The D− grade reflects net negative engagement — the lobbying interference outweighs the supportive positions when aggregated across direct lobbying and trade association memberships.

Source: InfluenceMap — https://influencemap.org/company/BP

**Legal Exposure: −3 / 20**

Sabin Center active cases: 12. Formula: 20 − (0.5 × 12) = 14. Score adjusted to −3 reflecting the target reversal credibility penalty applied to companies that publicly backtrack on stated commitments. The backtracking of the 2030 production target is treated as an active credibility risk separate from litigation count.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=bp · BP Annual Report 2023

**Computed Total: 11 / 100 · BREACH**

---

### Shell (SHEL) · Score: 19/100 · BREACH

**Pledge Quality: 8 / 30**

Shell's primary emissions metric is intensity — emissions per unit of energy produced — rather than absolute emissions. The 30% intensity reduction target by 2035 is consistent with a world where Shell's total production, and therefore absolute emissions, continues to grow while the rate per unit decreases. Paris Agreement 1.5°C pathways require absolute reductions across all scopes. Shell has not published an SBTi-validated absolute Scope 3 reduction target. The pledge quality score reflects partial ambition at the intensity level with a significant deduction for the absence of absolute targets.

Source: Shell Energy Transition Strategy 2023 — https://www.shell.com/sustainability/our-climate-target.html

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Consistent with BP's grade — disclosure without demonstrated strategic integration at the level required for B or A tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 3 / 25**

InfluenceMap grade: D. Shell engages in direct and indirect lobbying that has net negative alignment with Paris Agreement policy objectives. Trade association memberships with bodies that actively oppose climate regulation are included in InfluenceMap's assessment.

Source: InfluenceMap — https://influencemap.org/company/Shell

**Legal Exposure: −2 / 20**

Sabin Center active cases: 19. The Milieudefensie v Shell ruling (2021) ordered Shell to reduce absolute emissions 45% by 2030 relative to 2019 levels — a landmark judgment. Shell is appealing. Score adjusted to −2 reflecting the active court order as a material legal obligation that the company is currently contesting. This is the highest-severity individual case in the CONSCIENCE portfolio.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=shell · Milieudefensie v Shell (2021)

**Computed Total: 19 / 100 · BREACH**

---

### Delta Air Lines (DAL) · Score: 14/100 · BREACH

**Pledge Quality: 4 / 30**

Delta's carbon-neutral-by-2030 pledge relies primarily on carbon offsets and sustainable aviation fuel (SAF). As of 2024 reporting, SAF constitutes less than 1% of Delta's total fuel consumption. The offset quality component of the pledge came under FTC scrutiny in 2023 following Delta's marketing claims about carbon neutrality. A pledge that depends on offsets of contested quality and a fuel alternative currently at trace levels does not constitute credible 1.5°C alignment. No SBTi commitment filed.

Source: Delta Sustainability Report 2023 — https://www.delta.com/us/en/about-delta/sustainability

**CDP Performance: 10 / 25**

CDP 2023 grade: C.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 3 / 25**

InfluenceMap grade: D. Aviation sector lobbying through industry associations has consistently opposed more stringent emissions standards and fuel efficiency mandates.

Source: InfluenceMap — https://influencemap.org/company/Delta-Air-Lines

**Legal Exposure: −3 / 20**

Sabin Center active cases: 3. Score adjusted to −3 reflecting the FTC inquiry into Delta's carbon neutrality marketing claims (2023) as an active regulatory credibility risk above and beyond litigation case count. Regulatory inquiry into climate claims is a score-relevant event under CONSCIENCE methodology.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=delta · FTC Inquiry 2023

**Computed Total: 14 / 100 · BREACH**

---

### Starbucks (SBUX) · Score: 29/100 · BREACH

**⚠ Score Flag:** This is the most vulnerable score in the CONSCIENCE portfolio. Starbucks has published SBTi commitment and renewable energy targets that could support a higher Pledge Quality score. The current score is held in Breach band due to the FY2024 performance divergence: emissions moving in the wrong direction against a 2030 target. Verify all factor inputs against the most current FY filing before any public posting referencing this score.

**Pledge Quality: 14 / 30**

Starbucks has filed an SBTi commitment letter and published a −50% emissions by 2030 pledge against a 2019 baseline. The pledge covers Scope 1, 2, and 3 — a full-scope commitment. However, Pledge Quality assessment includes interim performance trajectory. FY2024 results show emissions +3.3% vs the 2019 baseline — moving away from the −50% target with six years remaining. The score reflects the ambition of the filed commitment offset by the current performance direction.

Source: Starbucks FY2024 Global Environmental and Social Impact Report — https://stories.starbucks.com/stories/sustainability/

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier — demonstrates governance integration and strategic planning. Consistent with a company that has filed SBTi commitment and published detailed sustainability reporting.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C. Mixed engagement — some supportive policy positions offset by industry association memberships with net-negative climate lobbying records.

Source: InfluenceMap — https://influencemap.org/company/Starbucks

**Legal Exposure: −12 / 20**

Sabin Center active cases: 1 (low). The −12 penalty applied here is a Performance Divergence Adjustment — a methodology provision for companies where verified emissions data shows trajectory moving in the opposite direction from the stated target. Starbucks waste to landfill increased 6% in FY2024. Scope 3 = 90.9% of total footprint, with dairy as the dominant driver. The business model is structurally dependent on the highest-emission product category in the food and beverage sector.

Source: Starbucks FY2024 Impact Report · SEC 10-K 2024 · CDP 2023

**Computed Total: 29 / 100 · BREACH**

---

### Walmart (WMT) · Score: 38/100 · WARNING

**Pledge Quality: 18 / 30**

Walmart's zero-emissions operations pledge by 2040 is accompanied by Project Gigaton — a supply chain emissions reduction initiative with a 1 billion tonne target by 2030. Project Gigaton is independently verified. SBTi has approved Walmart's operational science-based target. The supply chain scope (Gigaton) uses supplier self-reporting with third-party verification, which carries inherent measurement uncertainty. Score reflects genuine ambition with appropriate discounts for supply chain Scope 3 data quality and trajectory.

Source: Walmart ESG Report FY2024 — https://corporate.walmart.com/esgreport

**CDP Performance: 18 / 25**

CDP 2023 grade: B.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C. Mixed engagement. Retail sector trade association memberships with variable climate policy positions.

Source: InfluenceMap — https://influencemap.org/company/Walmart

**Legal Exposure: −7 / 20**

Sabin Center active cases: 2. Score adjusted to −7 reflecting Scope 3 supply chain emissions growth trajectory despite Gigaton program. Own operations at approximately 35% renewable energy against a 100% renewable and zero-emissions target by 2040 — current progress rate requires acceleration.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=walmart · Walmart FY2024 ESG Report

**Computed Total: 38 / 100 · WARNING**

---

### Meta (META) · Score: 43/100 · WARNING

**Pledge Quality: 20 / 30**

Meta pledges net zero across its full value chain by 2030 — an ambitious 8-year horizon that covers Scope 3. Meta achieved 100% renewable energy in owned operations in 2020 and maintains that status. However, post-pledge AI infrastructure expansion has driven a 25%+ increase in energy demand, requiring new power purchase agreements including gas generation. A net-zero-by-2030 pledge filed before the AI infrastructure expansion wave carries trajectory uncertainty.

Source: Meta Sustainability Report 2023 — https://sustainability.fb.com/

**CDP Performance: 18 / 25**

CDP 2023 grade: B.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. Mixed record. Technology sector engagement on climate policy is less systematically obstructive than fossil fuel sector, but Meta's trade association affiliations include organizations with net-negative climate lobbying positions.

Source: InfluenceMap — https://influencemap.org/company/Facebook-Meta

**Legal Exposure: −2 / 20**

Sabin Center active cases: 1. Score adjusted to −2 reflecting gas power plant agreements signed in 2024 as a credibility risk against the 2030 net-zero pledge. Signing long-term gas infrastructure commitments while claiming a 2030 net-zero target creates a structural inconsistency that CONSCIENCE treats as a legal and reputational exposure.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=meta · Bloomberg New Energy Finance 2024

**Computed Total: 43 / 100 · WARNING**

---

### Amazon (AMZN) · Score: 47/100 · WARNING

**Pledge Quality: 20 / 30**

Amazon's Climate Pledge commits to net-zero carbon by 2040 — ten years ahead of the Paris Agreement's 2050 framework. Amazon also committed to 100% renewable energy by 2025. The 2025 renewable energy target was missed. Emissions increased 18% between 2021 and 2022 as AWS and logistics infrastructure expanded faster than renewable procurement. The score reflects genuine ambition with significant interim performance penalty for the missed 2025 target.

Source: Amazon Climate Pledge — https://sustainability.aboutamazon.com/

**CDP Performance: 18 / 25**

CDP 2023 grade: B.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C.

Source: InfluenceMap — https://influencemap.org/company/Amazon

**Legal Exposure: 0 / 20**

Sabin Center active cases: 3. Formula: 20 − (0.5 × 3) = 18.5, normalized to 0 after interim target miss adjustment. No severe individual cases requiring further penalty.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=amazon

**Computed Total: 47 / 100 · WARNING**

---

### Microsoft (MSFT) · Score: 61/100 · ON TRACK

**Pledge Quality: 26 / 30**

Microsoft's carbon-negative-by-2030 pledge is the most ambitious absolute emissions commitment in the CONSCIENCE portfolio — the company pledges not just to reach zero but to remove more carbon than it emits annually by 2030, and to eliminate all historical emissions by 2050. The pledge covers Scope 1, 2, and 3. SBTi has validated the target at the 1.5°C level. The score deduction from 30 reflects Microsoft's own disclosure that emissions have increased 29% since the 2020 pledge due to AI data center energy demand — the trajectory currently runs opposite to the target direction.

Source: Microsoft Sustainability Report 2024 — https://www.microsoft.com/en-us/sustainability

**CDP Performance: 22 / 25**

CDP 2023 grade: A−. Near-leadership tier. Demonstrates strong governance integration, science-based strategy, and comprehensive disclosure.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 13 / 25**

InfluenceMap grade: B−. Broadly supportive of climate policy with some mixed positions through trade association memberships. Technology sector engagement is generally more constructive than fossil fuel sector.

Source: InfluenceMap — https://influencemap.org/company/Microsoft

**Legal Exposure: 0 / 20**

Sabin Center active cases: 1. Formula: 20 − (0.5 × 1) = 19.5. Score set at 0 after disclosed trajectory adjustment — the 29% emissions increase against a carbon-negative pledge creates a forward legal exposure that is not yet reflected in active case count but warrants zero-scoring on this factor pending trajectory reversal evidence.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=microsoft · Microsoft 2024 Environmental Sustainability Report

**Computed Total: 61 / 100 · ON TRACK**

---

### Unilever (ULVR) · Score: 72/100 · ON TRACK

**Pledge Quality: 28 / 30**

Unilever's Climate Transition Action Plan commits to net zero across the full value chain by 2039, with a verified SBTi 1.5°C-aligned target. Interim targets include −50% operational emissions by 2030 against a 2015 baseline and zero deforestation across the supply chain. Operational emissions have fallen 23% since 2015 — one of the strongest verified interim performance records in the CONSCIENCE portfolio. The two-point deduction from 30 reflects persistent palm oil supply chain concerns and Scope 3 improvement trajectory that is slower than operational progress.

Source: Unilever Climate Transition Action Plan 2023 — https://www.unilever.com/planet-and-society/climate-action/

**CDP Performance: 22 / 25**

CDP 2023 grade: A−.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 16 / 25**

InfluenceMap grade: B. Unilever is among the more constructive large-cap companies on climate policy engagement, with direct lobbying broadly supportive of ambitious regulation and active engagement to align trade association positions with Paris Agreement objectives.

Source: InfluenceMap — https://influencemap.org/company/Unilever

**Legal Exposure: 6 / 20**

Sabin Center active cases: 1. Formula: 20 − (0.5 × 1) = 19.5. Score set to 6 reflecting an ongoing palm oil deforestation supply chain risk assessment — not yet in active litigation but flagged as a forward exposure. The 6-point score rather than the full 20 reflects this pending risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=unilever

**Computed Total: 72 / 100 · ON TRACK**

---

### Apple (AAPL) · Score: 84/100 · ON TRACK

**Pledge Quality: 30 / 30**

Apple's carbon-neutral-across-all-products-and-supply-chain-by-2030 pledge is the only full-marks pledge in the CONSCIENCE portfolio. The commitment covers every Apple product manufactured and used, including Scope 3 supply chain and customer use-phase emissions. Apple's 2030 target was accompanied by a credible transition roadmap with verified interim milestones. Per the 2024 Environmental Progress Report, Apple has reduced emissions by more than 55% from its 2015 baseline — the strongest verified interim performance record in the portfolio. 100% renewable energy has been maintained in owned operations since 2018. SBTi has approved the target at 1.5°C.

Source: Apple Environmental Progress Report 2024 — https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf

**CDP Performance: 25 / 25**

CDP 2023 grade: A. Leadership tier — the highest CDP grade. Fewer than 2% of CDP respondents achieve A-list status. Apple's A grade reflects demonstrated best practice in governance, strategy, targets, and action.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 19 / 25**

InfluenceMap grade: B+. Broadly supportive of climate policy. The score deduction from 25 reflects some technology sector trade association memberships with positions that are not fully aligned with Apple's direct lobbying stance on climate.

Source: InfluenceMap — https://influencemap.org/company/Apple

**Legal Exposure: 10 / 20**

Sabin Center active cases: 0. Formula: 20 − (0.5 × 0) = 20. Score set to 10 rather than 20 as a conservative adjustment — zero active climate cases is exceptional and reflects genuine legal alignment, but the CONSCIENCE methodology applies a floor adjustment for all companies given that legal exposure can change rapidly. Apple's clean litigation record is the only zero-case record in the portfolio.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=apple

**Computed Total: 84 / 100 · ON TRACK**

---

## Methodology Notes

### Performance Divergence Adjustment
Applied when verified emissions data shows trajectory moving opposite to stated target within a 12-month reporting window. Currently applied to: Starbucks (FY2024 +3.3% vs −50% by 2030 target). Triggers score review regardless of CDP grade or pledge quality.

### Lobbying Credibility Rule
A company cannot claim Paris-aligned targets while funding obstruction of the regulatory framework required to achieve them. InfluenceMap grades below D receive zero points and may receive negative adjustment. This rule is the primary driver of the score gap between fossil fuel companies with stated pledges (ExxonMobil, BP, Shell) and their actual CONSCIENCE scores.

### Legal Exposure Formula
Base 20 − (0.5 × active cases). Floor = 0. Cases are sourced from Sabin Center real-time litigation database. Active cases only — dismissed cases are excluded. Score is adjusted further for severity of individual cases (e.g., court orders, FTC inquiries, attorney general investigations).

### Score Update Protocol
Scores are updated when material new information is published in: CDP annual responses (Q4 cycle) · SBTi registry status changes · Sabin Center new or closed cases · Company annual sustainability reports and 10-K filings · InfluenceMap major reassessments. All score updates are logged permanently in the Score Changelog on the live platform and in this document.

---

## Version History

### v1.1 · May 5, 2026 — CDP scale resolution upgrade
CDP Performance scoring extended from a 4-tier (A/B/C/D) scale to the full CDP 9-tier published scale (A, A−, B, B−, C, C−, D, D−, F). New point values:

| Grade | Points | v1.0 → v1.1 |
|-------|--------|-------------|
| A | 25 | unchanged |
| A− | 22 | new tier |
| B | 18 | unchanged |
| B− | 14 | new tier |
| C | 10 | unchanged |
| C− | 7 | new tier |
| D | 4 | unchanged |
| D− | 2 | new tier |
| F | 0 | replaces v1.0 "No response = 0" label (same value) |

**Migration impact:** Every v1.0 baseline company score is preserved exactly. Of the 11 companies established March 18, 2026, two (Microsoft, Unilever) hold CDP grade A− and were scored at 22 / 25 in v1.0 — a value that was not derivable from the v1.0 scoring table as written (which only listed A=25, B=18, C=10, D=4) but was applied in their per-company derivations. v1.1 codifies the A−=22 interpolation that v1.0 was already using in practice, and adds the remaining B−, C−, D− tiers for completeness. All other companies hold whole-letter grades (A, B, C, D) and their scores are bit-for-bit identical between v1.0 and v1.1. The relabel of "No response" to F is cosmetic — same point value, more accurate alignment with CDP's published terminology.

**Why this exists:** CDP's published grade scale is A, A−, B, B−, C, C−, D, D−, F. The v1.0 scoring table documented only 4 tiers (A/B/C/D) but the v1.0 per-company derivations for Microsoft and Unilever cited grade A− and applied the value 22, leaving the interpolation rule undocumented at the table level. v1.1 closes that disclosure gap so the methodology table matches both the CDP source documentation and the values actually applied in v1.0's company score derivations. This change is published under the Open Proof Protocol — surfaced and corrected without prompt.

### v1.0 · March 18, 2026 — Initial baseline
First published methodology. CDP simplified to 4 tiers (A=25, B=18, C=10, D=4, No response = 0). InfluenceMap, Pledge Quality, Legal Exposure formulas as documented above. 11 companies scored against Paris Agreement 1.5°C pathways. Prior art timestamped: github.com/dablerfrost/Vyrion.

---

## Open Proof Protocol

Every score in this document is source-cited. Every source is linked. If any score, data point, or source citation is incorrect, report it to contact@vyrion.earth. VYRION will publish a correction within 24 hours as a permanent, timestamped entry in the Score Changelog. No original entries are ever deleted.

Find the error. We will publish the correction.

---

*CONSCIENCE-METHODOLOGY.md · v1.1 · May 5, 2026*  
*VYRION LLC · Tyler Frost / DablerFrost · Hilo, Hawaii*  
*github.com/DablerFrost/Vyrion · About: vyrion.earth/about*

---

## v2.9 Expansion — 25 Additional Company Derivations
### Published October 10, 2026 · Scores established June 5, 2026

*The following 25 companies were added to CONSCIENCE coverage in v2.9 (June 5, 2026), expanding the portfolio from 11 to 36 companies. Factor inputs were published on the live platform at launch; full prose derivations are published here under the Open Proof Protocol. All scores use the v1.1 methodology without modification.*

---

### Chevron (CVX) · Score: 8/100 · BREACH

**Pledge Quality: 3 / 30**

Chevron's net-zero-by-2050 pledge covers Scope 1 and 2 operational emissions only — the same structural exclusion as ExxonMobil. Scope 3, representing 90%+ of Chevron's total lifecycle emissions from combustion of sold products, is unaddressed. The pledge references Paris alignment through lower carbon intensity targets, but intensity metrics permit absolute emissions growth. No SBTi commitment has been filed. Upstream production expansion extends through 2027, and the Hess acquisition deepens fossil fuel lock-in rather than transitioning away from it.

Source: Chevron Climate Report 2023 — https://www.chevron.com/sustainability

**CDP Performance: 4 / 25**

CDP 2023 grade: D. Disclosure-only tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 0 / 25**

InfluenceMap grade: F. Chevron lobbied against U.S. climate legislation with $3M+ in 2023 directed spend. Active obstruction of the regulatory framework required for net zero while claiming Paris alignment is the core CONSCIENCE contradiction signal.

Source: InfluenceMap — https://influencemap.org/company/Chevron

**Legal Exposure: 1 / 20**

Sabin Center active cases: 8. Formula: 20 − (0.5 × 8) = 16. Score adjusted to 1 reflecting severity of active climate litigation exposure.

Source: Sabin Center for Climate Change Law — https://climatecasechart.com/case-list/?organization_name=chevron

**Computed Total: 8 / 100 · BREACH**

---

### TotalEnergies (TTE) · Score: 20/100 · BREACH

**Pledge Quality: 8 / 30**

TotalEnergies pledges net zero by 2050 "across all products sold and operations" with 100GW renewables capacity by 2030 — nominally broader than U.S. oil majors. However, the net-zero definition permits continued sale of natural gas to third parties with Scope 3 excluded from binding targets. Oil and gas production is growing through 2028, and significant LNG expansion is underway. The pledge's headline scope exceeds its operational substance. No SBTi commitment filed.

Source: TotalEnergies Climate & Energy Ambition 2023 — https://totalenergies.com/sustainability/climate

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Awareness tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 3 / 25**

InfluenceMap grade: D. Net negative alignment with Paris Agreement policy objectives.

Source: InfluenceMap — https://influencemap.org/company/Total

**Legal Exposure: −1 / 20**

Sabin Center active cases: 5. Formula: 20 − (0.5 × 5) = 17.5. Score adjusted to −1 reflecting LNG expansion as an active credibility risk against stated climate ambition.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=total

**Computed Total: 20 / 100 · BREACH**

---

### ConocoPhillips (COP) · Score: 13/100 · BREACH

**Pledge Quality: 4 / 30**

ConocoPhillips pledges net zero Scope 1 and 2 by 2050 with a −35% GHG intensity target by 2030 vs 2016. Upstream oil operations cover approximately 5% of total lifecycle emissions — the pledge addresses the smallest slice while Scope 3 from combusted products goes unmentioned. Sustained exploration and production expansion contradict the intensity framing. No SBTi commitment filed.

Source: ConocoPhillips Climate Report 2023

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Awareness tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 2 / 25**

InfluenceMap grade: D−. Net negative engagement across direct lobbying and trade association memberships.

Source: InfluenceMap — https://influencemap.org/company/ConocoPhillips

**Legal Exposure: −3 / 20**

Sabin Center active cases: 4. Formula: 20 − (0.5 × 4) = 18. Score adjusted to −3 reflecting continued exploration expansion as an active credibility risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=conocophillips

**Computed Total: 13 / 100 · BREACH**

---

### Glencore (GLEN) · Score: 10/100 · BREACH

**Pledge Quality: 3 / 30**

Glencore pledges net zero by 2050 with a "managed wind-down of coal through the energy transition" — but the wind-down timeline is indefinite and undefined. Glencore is the world's largest thermal coal trader at 90M+ tonnes annually. Scope 3 from coal sales, the dominant emissions category, lacks an absolute reduction target. A pledge without a timeline on the company's core product is not a pledge. No SBTi commitment filed.

Source: Glencore Climate Report 2023

**CDP Performance: 4 / 25**

CDP 2023 grade: D. Disclosure-only tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 3 / 25**

InfluenceMap grade: D. Net negative alignment.

Source: InfluenceMap — https://influencemap.org/company/Glencore

**Legal Exposure: 0 / 20**

Sabin Center active cases: 6. Formula: 20 − (0.5 × 6) = 17. Score adjusted to 0 reflecting coal operations as an ongoing legal and regulatory exposure.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=glencore

**Computed Total: 10 / 100 · BREACH**

---

### Toyota (TM) · Score: 14/100 · BREACH

**Pledge Quality: 4 / 30**

Toyota pledges carbon neutrality by 2050 via a "multi-pathway approach" — hybrids, hydrogen, and battery electric. The 3.5M EV and fuel-cell vehicle sales target by 2030 reads as ambition until measured against 2023 reality: BEV sales were under 1% of Toyota's global fleet. The hybrid-first strategy extends internal combustion relevance rather than displacing it. No SBTi commitment filed. The pledge's breadth is its weakness — every pathway except the fastest one.

Source: Toyota Sustainability Report 2023

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Awareness tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 3 / 25**

InfluenceMap grade: D. InfluenceMap has ranked Toyota the most aggressive global auto lobbyist against EV mandates — the company most actively working to slow the transition it claims to support. This is the clearest pledge-vs-lobbying contradiction in the automotive sector.

Source: InfluenceMap — https://influencemap.org/company/Toyota

**Legal Exposure: −3 / 20**

Sabin Center active cases: 2. Score adjusted to −3 reflecting the lobbying-against-mandates record as a regulatory credibility risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=toyota

**Computed Total: 14 / 100 · BREACH**

---

### JPMorgan Chase (JPM) · Score: 11/100 · BREACH

**Pledge Quality: 3 / 30**

JPMorgan pledges a Paris-aligned financing portfolio by 2030 and net-zero financed emissions by 2050. The bank is simultaneously the largest global fossil fuel financier — $434B in fossil fuel financing since the Paris Agreement (2016–2023). In 2024, JPMorgan withdrew from the Net-Zero Banking Alliance, the primary industry accountability mechanism for its own pledge category. A financed-emissions pledge from the world's largest fossil fuel lender, made while exiting the alliance designed to verify it, does not constitute credible commitment.

Source: JPMorgan Chase Climate Report 2023

**CDP Performance: 4 / 25**

CDP 2023 grade: D. Disclosure-only tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 4 / 25**

InfluenceMap grade: D. Net negative alignment.

Source: InfluenceMap — https://influencemap.org/company/JPMorgan-Chase

**Legal Exposure: 0 / 20**

Sabin Center active cases: 3. Formula: 20 − (0.5 × 3) = 18.5. Score adjusted to 0 reflecting the NZBA withdrawal as a material credibility event with potential regulatory scrutiny.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=jpmorgan

**Computed Total: 11 / 100 · BREACH**

---

### United Airlines (UAL) · Score: 15/100 · BREACH

**Pledge Quality: 4 / 30**

United pledges net zero by 2050 via sustainable aviation fuel, efficiency, and carbon removal, with green bonds issued for fleet renewal. SAF constitutes less than 1% of total fuel consumption — the pledge's primary decarbonization lever exists at trace levels. Absolute emissions are recovering toward pre-pandemic levels. No SBTi commitment filed. The 2050 target relies on technologies and fuel supplies that do not yet exist at scale.

Source: United Airlines Sustainability Report 2023

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Awareness tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 4 / 25**

InfluenceMap grade: D. Aviation sector lobbying has consistently opposed more stringent emissions standards.

Source: InfluenceMap — https://influencemap.org/company/United-Airlines

**Legal Exposure: −3 / 20**

Sabin Center active cases: 2. Score adjusted to −3 reflecting rising absolute emissions against the net-zero trajectory as a forward credibility risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=united

**Computed Total: 15 / 100 · BREACH**

---

### Duke Energy (DUK) · Score: 24/100 · BREACH

**Pledge Quality: 9 / 30**

Duke Energy pledges net zero by 2050 with 50% carbon reduction from electricity generation by 2030 vs 2005 and 40% clean energy by 2030. The interim target has specificity, but Duke remains the second-largest U.S. coal operator, and the 2030 trajectory is insufficient at the current pace. No SBTi commitment filed. The pledge is more detailed than peers' but the underlying asset base contradicts the timeline.

Source: Duke Energy Sustainability Report 2023

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Awareness tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. Mixed record — less obstructive than fossil fuel peers but with utility-sector positions that slow clean energy deployment.

Source: InfluenceMap — https://influencemap.org/company/Duke-Energy

**Legal Exposure: −2 / 20**

Sabin Center active cases: 3. Score adjusted to −2 reflecting coal asset exposure and grid-scale transition risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=duke

**Computed Total: 24 / 100 · BREACH**

---

### BASF (BAS) · Score: 27/100 · BREACH

**Pledge Quality: 10 / 30**

BASF pledges net zero by 2050 with 25% Scope 1 and 2 reduction by 2030 vs 2018. As the world's largest chemical company by revenue, process emissions are extremely high — and the 2030 targets cover Scope 1 and 2 only, excluding the Scope 3 value-chain emissions that dominate the footprint. No SBTi commitment filed. The carbon-neutral product portfolio roadmap remains in development rather than deployed.

Source: BASF Sustainability Report 2023

**CDP Performance: 10 / 25**

CDP 2023 grade: C. Awareness tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/BASF

**Legal Exposure: 0 / 20**

Sabin Center active cases: 1. Formula: 20 − (0.5 × 1) = 19.5. Score adjusted to 0 reflecting chemical-sector regulatory exposure as a forward risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=basf

**Computed Total: 27 / 100 · BREACH**

---

### BlackRock (BLK) · Score: 29/100 · BREACH

**Pledge Quality: 10 / 30**

BlackRock pledges net zero across its investment portfolio by 2050 with TCFD-aligned disclosure and climate risk integration. With $10T+ in assets under management including major fossil fuel holdings, the pledge's credibility rests on stewardship action — but BlackRock voted against the majority of climate shareholder resolutions in 2023 and withdrew from Climate Action 100+, the primary investor accountability coalition. A net-zero portfolio pledge from an asset manager that votes against climate resolutions and exits the verification coalition is structurally hollow.

Source: BlackRock Sustainability Report 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/BlackRock

**Legal Exposure: −6 / 20**

Sabin Center active cases: 4. Score adjusted to −6 reflecting the stewardship reversal — voting against climate resolutions while pledging portfolio net zero — as a material credibility and potential fiduciary risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=blackrock

**Computed Total: 29 / 100 · BREACH**

---

### Coca-Cola (KO) · Score: 30/100 · BREACH

**Pledge Quality: 11 / 30**

Coca-Cola pledges 30% absolute emission reduction across the full value chain by 2030 vs 2015, with net zero by 2050. SBTi commitment filed — a genuine positive. However, Scope 3 represents 90%+ of the total footprint and improvement is slow. The company has been ranked the world's largest plastic polluter by Break Free From Plastic audits for consecutive years — the packaging waste crisis is inseparable from the emissions footprint. The pledge is structurally sound but the dominant emission and waste categories show minimal trajectory improvement.

Source: Coca-Cola Sustainability Report 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/Coca-Cola

**Legal Exposure: −6 / 20**

Sabin Center active cases: 3. Score adjusted to −6 reflecting plastic pollution liability as an escalating legal exposure adjacent to the climate pledge.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=coca-cola

**Computed Total: 30 / 100 · BREACH**


---

### Volkswagen (VOW3) · Score: 31/100 · WARNING

**Pledge Quality: 12 / 30**

Volkswagen pledges climate neutrality by 2050 with 55% CO2 reduction across fleet lifecycle by 2030 vs 2018 and 70% BEV sales mix in Europe by 2030. SBTi commitment filed. The EV transition is genuine — but the Dieselgate legacy (11M defeat devices, $30B+ in settlements) permanently discounts credibility scoring. EU CAFE fine exposure from 2025 adds regulatory pressure. The pledge scores above fossil fuel peers on ambition and third-party validation, but below target pace on delivery.

Source: Volkswagen Group Sustainability Report 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. InfluenceMap documents continued lobbying against stringent EU emission standards — the company is transitioning its fleet while lobbying to slow the regulations that would accelerate the transition.

Source: InfluenceMap — https://influencemap.org/company/Volkswagen

**Legal Exposure: −6 / 20**

Sabin Center active cases: 5. Score adjusted to −6 reflecting Dieselgate as a permanent credibility impairment — the largest automotive emissions fraud in history cannot be fully remediated by subsequent pledges.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=volkswagen

**Computed Total: 31 / 100 · WARNING**

---

### Ford (F) · Score: 34/100 · WARNING

**Pledge Quality: 13 / 30**

Ford pledges carbon neutrality globally by 2050, 100% zero-emission vehicle sales in Europe by 2030, and 40–50% global EV mix by 2030. SBTi commitment filed. But the Ford Model e EV unit posted a $5.1B loss in 2024, production targets have been reduced, and ICE/hybrid revenue is cross-subsidizing the EV pivot. The pledge is credible in design; the economics of delivery are deteriorating. 2030 milestone trajectory is uncertain.

Source: Ford Integrated Sustainability & Financial Report 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/Ford

**Legal Exposure: −6 / 20**

Sabin Center active cases: 2. Score adjusted to −6 reflecting EV unit losses as a transition-pace risk — the financial viability of the pledged transition is itself the exposure.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=ford

**Computed Total: 34 / 100 · WARNING**

---

### Nestlé (NESN) · Score: 33/100 · WARNING

**Pledge Quality: 14 / 30**

Nestlé pledges net zero by 2050 with 20% absolute emission reduction by 2025 (Scope 1&2) and SBTi 1.5°C commitment across the full value chain. But Scope 3 from agriculture represents 95% of the total footprint — and improvement there is slow. The deforestation-free supply chain target missed its 2020 deadline. Palm oil sourcing compliance is patchy per Forest500 assessments. Water extraction faces escalating scrutiny. The pledge covers the right scopes; delivery concentrates in the smallest one.

Source: Nestlé Net Zero Roadmap 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/Nestle

**Legal Exposure: −6 / 20**

Sabin Center active cases: 4. Score adjusted to −6 reflecting supply chain deforestation risk and the missed 2020 deadline as forward legal exposures.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=nestle

**Computed Total: 33 / 100 · WARNING**

---

### H&M Group (HMB) · Score: 36/100 · WARNING

**Pledge Quality: 14 / 30**

H&M pledges 56% absolute emission reduction by 2030 vs 2019 with net zero by 2040 — SBTi 1.5°C committed, and the 2030 interim target is among the more ambitious in apparel. But the fast fashion business model is structurally premised on overproduction and rapid turnover — volume growth directly contradicts absolute emission reduction. The tension is not a delivery gap; it is a business-model contradiction.

Source: H&M Group Sustainability Disclosure 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 7 / 25**

InfluenceMap grade: C−. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/HM

**Legal Exposure: −3 / 20**

Sabin Center active cases: 3. Score adjusted to −3 reflecting the 2022 Netherlands greenwashing lawsuit over the Conscious Collection as an active credibility risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=hm

**Computed Total: 36 / 100 · WARNING**

---

### Rio Tinto (RIO) · Score: 38/100 · WARNING

**Pledge Quality: 15 / 30**

Rio Tinto pledges net zero Scope 1 and 2 by 2050 with 50% absolute Scope 1&2 reduction by 2030 vs 2018, plus stated Scope 3 reduction ambition. SBTi commitment filed. But iron ore, bauxite, and copper extraction drive enormous downstream Scope 3 emissions from steel and aluminium production — 97%+ of the total footprint sits outside the binding target. The Juukan Gorge heritage destruction (2020) exposed systemic ESG governance failures that discount all forward commitments.

Source: Rio Tinto Climate Change Report 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/Rio-Tinto

**Legal Exposure: −4 / 20**

Sabin Center active cases: 2. Score adjusted to −4 reflecting Scope 3 trajectory risk and governance overhang from Juukan Gorge.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=rio-tinto

**Computed Total: 38 / 100 · WARNING**

---

### BHP (BHP) · Score: 41/100 · WARNING

**Pledge Quality: 16 / 30**

BHP pledges net zero by 2050 with 30% absolute Scope 1&2 reduction by FY2030 vs FY2020, published in a Climate Transition Action Plan (2024), plus a customer Scope 3 decarbonisation support programme. As a major metallurgical coal and iron ore exporter, downstream steel Scope 3 emissions are enormous — 96%+ of the footprint. The BHP Petroleum spin-off into Woodside (2022) removed emissions from BHP's books while maintaining aggregate production — a portfolio reshuffle, not a reduction. TPI Level 4/5 indicates stronger transition planning than mining peers.

Source: BHP Climate Transition Action Plan 2024

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/BHP

**Legal Exposure: −2 / 20**

Sabin Center active cases: 2. Score adjusted to −2 reflecting Scope 3 downstream risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=bhp

**Computed Total: 41 / 100 · WARNING**

---

### Procter & Gamble (PG) · Score: 40/100 · WARNING

**Pledge Quality: 16 / 30**

P&G pledges net zero emissions by 2040 — a decade ahead of the Paris framework — with 50% absolute Scope 1&2 reduction by 2030 vs 2010 and a responsible deforestation policy. SBTi commitment filed. But Scope 3 exceeds 95% of total emissions, driven by palm oil and wood pulp from deforestation-linked Indonesian suppliers. Forest500 compliance on zero-deforestation commitments sits below stated levels. Product-use emissions dominate in home care. The 2040 ambition is real; the supply chain it depends on is not yet aligned.

Source: P&G FY2024 Citizenship Report

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/Procter-Gamble

**Legal Exposure: −3 / 20**

Sabin Center active cases: 2. Score adjusted to −3 reflecting deforestation supply chain risk as a forward legal exposure.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=procter-gamble

**Computed Total: 40 / 100 · WARNING**

---

### Nike (NKE) · Score: 46/100 · WARNING

**Pledge Quality: 18 / 30**

Nike pledges 70% absolute Scope 1&2 reduction by 2030 through the Move to Zero platform, with Scope 3 reduction targets via supplier engagement. But Scope 3 from contract manufacturing exceeds 90% of the footprint — and supply chain emission growth is outpacing Scope 1&2 reductions. Sustainable materials are scaling from a very small base. No approved SBTi target yet. The operational pledge is strong; the value-chain pledge, where nearly all emissions live, remains aspirational.

Source: Nike FY2023 Impact Report

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 9 / 25**

InfluenceMap grade: C. Mixed engagement.

Source: InfluenceMap — https://influencemap.org/company/Nike

**Legal Exposure: 1 / 20**

Sabin Center active cases: 1. Formula: 20 − (0.5 × 1) = 19.5. Score adjusted to 1 reflecting the Scope 3 delivery gap as the primary forward risk rather than litigation.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=nike

**Computed Total: 46 / 100 · WARNING**

---

### Maersk (MAERSK-B) · Score: 54/100 · WARNING

**Pledge Quality: 22 / 30**

Maersk pledges net zero by 2040 — ten years ahead of the Paris Agreement framework — with the first commercial green methanol vessel deployed in 2023 and 25% of the ocean fleet on green fuel by 2030. SBTi 1.5°C approved. This is the most credible decarbonization commitment in the shipping sector. The deduction reflects execution risk: approximately 2% of the fleet runs on green fuel today against the 25% 2030 target, and green methanol production supply is severely constrained industry-wide. The pledge is verified; the fuel supply chain is not yet built.

Source: Maersk Sustainability Report 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 14 / 25**

InfluenceMap grade: B−. Broadly supportive of maritime decarbonization policy.

Source: InfluenceMap — https://influencemap.org/company/Maersk

**Legal Exposure: 0 / 20**

Sabin Center active cases: 0. Score set at 0 rather than the formula 20, reflecting green fuel scaling risk — the binding constraint on the pledge is industrial, not legal, but the exposure is real enough to zero the factor pending demonstrated fuel-supply progress.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=maersk

**Computed Total: 54 / 100 · WARNING**

---

### Alphabet (GOOGL) · Score: 60/100 · WARNING

**Pledge Quality: 24 / 30**

Alphabet pledges net zero across operations and value chain by 2030, with 24/7 carbon-free energy at every data center globally by 2030. SBTi 1.5°C approved. But the company's own 2024 Environmental Report discloses GHG emissions up 48% from 2019 to 2024, driven by AI energy demand — and 2020 carbon-free energy milestones were missed. Advanced nuclear investments are positioned as the path forward. The pledge architecture is among the strongest in tech; the trajectory is currently its opposite. This is the Microsoft pattern at higher amplitude.

Source: Google Environmental Report 2024

**CDP Performance: 22 / 25**

CDP 2023 grade: A−. Near-leadership tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 16 / 25**

InfluenceMap grade: B. Broadly supportive of climate policy.

Source: InfluenceMap — https://influencemap.org/company/Alphabet

**Legal Exposure: −2 / 20**

Sabin Center active cases: 1. Score adjusted to −2 reflecting the +48% emissions surge against the 2030 net-zero pledge as a forward credibility exposure.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=alphabet

**Computed Total: 60 / 100 · WARNING**

---

### Johnson & Johnson (JNJ) · Score: 57/100 · WARNING

**Pledge Quality: 22 / 30**

Johnson & Johnson pledges carbon neutrality in own operations by 2030 and net zero across the full value chain by 2045, with 100% renewable electricity globally by 2025. SBTi 1.5°C approved. Approximately 70% renewable electricity achieved; own-operations emissions down ~35% since 2016 — on track against near-term milestones. The pharmaceutical supply chain (Scope 3) is improving but remains the long pole. One of the steadier trajectories in the portfolio.

Source: Johnson & Johnson ESG Performance Summary 2023

**CDP Performance: 22 / 25**

CDP 2023 grade: A−. Near-leadership tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 14 / 25**

InfluenceMap grade: B−. Broadly supportive with some mixed trade association positions.

Source: InfluenceMap — https://influencemap.org/company/Johnson-Johnson

**Legal Exposure: −1 / 20**

Sabin Center active cases: 1. Score adjusted to −1 reflecting Scope 3 supply chain as the residual forward risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=johnson-johnson

**Computed Total: 57 / 100 · WARNING**

---

### CBRE Group (CBRE) · Score: 55/100 · WARNING

**Pledge Quality: 21 / 30**

CBRE pledges net zero across Scope 1, 2, and 3 by 2040 — full value-chain scope, which is unusual in real estate services. SBTi 1.5°C approved, with 100% renewable electricity in own operations by 2025. But building management is the dominant footprint, and managed-portfolio emission reductions require client cooperation — Scope 3 is not fully within CBRE's operational control. The pledge is well-structured; delivery depends on third parties.

Source: CBRE 2023 Corporate Responsibility Report

**CDP Performance: 22 / 25**

CDP 2023 grade: A−. Near-leadership tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 13 / 25**

InfluenceMap grade: B−. Broadly supportive with some mixed positions.

Source: InfluenceMap — https://influencemap.org/company/CBRE

**Legal Exposure: −1 / 20**

Sabin Center active cases: 1. Score adjusted to −1 reflecting client-dependent Scope 3 delivery risk.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=cbre

**Computed Total: 55 / 100 · WARNING**


---

### NextEra Energy (NEE) · Score: 67/100 · ON TRACK

**Pledge Quality: 25 / 30**

NextEra pledges "Real Zero" by 2045 — no carbon dioxide from operations, without reliance on offsets. As America's largest renewable energy company (67GW+ clean capacity), the pledge is backed by the asset base to deliver it. SBTi 1.5°C approved. Some natural gas peaker plants remain in operation, and grid interconnection delays limit the pace of renewable deployment — the deductions reflect infrastructure constraints, not ambition gaps. The most credible utility pledge in the portfolio.

Source: NextEra Energy Sustainability Report 2023

**CDP Performance: 18 / 25**

CDP 2023 grade: B. Management tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 14 / 25**

InfluenceMap grade: B−. Broadly supportive of clean energy policy.

Source: InfluenceMap — https://influencemap.org/company/NextEra-Energy

**Legal Exposure: 10 / 20**

Sabin Center active cases: 0. Score set at 10 rather than the formula 20, reflecting the conservative adjustment applied to zero-case companies — clean litigation record with minor forward regulatory exposure from the pace of the energy transition.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=nextera

**Computed Total: 67 / 100 · ON TRACK**

---

### Salesforce (CRM) · Score: 66/100 · ON TRACK

**Pledge Quality: 24 / 30**

Salesforce pledges net zero by 2040 with full Scope 3 supply chain decarbonisation. 100% renewable energy achieved in 2022 — delivered, not promised. SBTi 1.5°C approved. Scope 3 Purchased Goods & Services represents ~85% of the total footprint and is harder to control than own operations, which tempers the score. Strong governance and transparent reporting support the rating.

Source: Salesforce FY2024 Stakeholder Impact Report

**CDP Performance: 22 / 25**

CDP 2023 grade: A−. Near-leadership tier.

Source: CDP 2023 — https://www.cdp.net/en/responses

**Lobbying Alignment: 16 / 25**

InfluenceMap grade: B. Broadly supportive of climate policy.

Source: InfluenceMap — https://influencemap.org/company/Salesforce

**Legal Exposure: 4 / 20**

Sabin Center active cases: 0. Score set at 4 reflecting Scope 3 supply chain as the residual forward exposure despite the clean litigation record.

Source: Sabin Center — https://climatecasechart.com/case-list/?organization_name=salesforce

**Computed Total: 66 / 100 · ON TRACK**

---

## Version History (continued)

### v1.2 · October 10, 2026 — v2.9 expansion derivations published + Apple correction

**25-company derivations published.** Full per-company prose derivations for all 25 companies added in the v2.9 coverage expansion (June 5, 2026) are published in this document for the first time. Factor inputs for these companies were published on the live platform at launch; this update closes the documentation gap under the Open Proof Protocol. All 36 portfolio companies now carry published derivations. No score values changed.

**Apple correction (Open Proof Protocol).** The Apple derivation previously stated "reduced emissions 62% from its 2015 baseline" citing the Apple Environmental Progress Report 2024. The 2024 report states "more than 55%." The figure has been corrected to match the cited source. No score impact — Apple's Pledge Quality assessment does not hinge on the single-figure precision. Correction published within 24 hours of identification, per protocol. Original entry preserved in version history.

*Find the error. We published the correction.*
