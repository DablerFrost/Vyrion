[CONSCIENCE-METHODOLOGY (2).md](https://github.com/user-attachments/files/26689101/CONSCIENCE-METHODOLOGY.2.md)
[CONSCIENCE-METHODOLOGY (1).md](https://github.com/user-attachments/files/26479064/CONSCIENCE-METHODOLOGY.1.md)
# CONSCIENCE-METHODOLOGY.md
## Per-Company Score Derivation · v1.1 · May 5, 2026
## VYRION PBC · Open Proof Protocol

**Platform:** https://dablerfrost.github.io/Vyrion  
**Errors:** contact@vyrion.earth → correction published within 24 hours  
**Prior art:** github.com/dablerfrost/conscience (timestamped March 18, 2026)

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

Apple's carbon-neutral-across-all-products-and-supply-chain-by-2030 pledge is the only full-marks pledge in the CONSCIENCE portfolio. The commitment covers every Apple product manufactured and used, including Scope 3 supply chain and customer use-phase emissions. Apple's 2030 target was accompanied by a credible transition roadmap with verified interim milestones. As of 2024, Apple has reduced emissions 62% from its 2015 baseline — the strongest verified interim performance record in the portfolio. 100% renewable energy has been maintained in owned operations since 2018. SBTi has approved the target at 1.5°C.

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
First published methodology. CDP simplified to 4 tiers (A=25, B=18, C=10, D=4, No response = 0). InfluenceMap, Pledge Quality, Legal Exposure formulas as documented above. 11 companies scored against Paris Agreement 1.5°C pathways. Prior art timestamped: github.com/dablerfrost/conscience.

---

## Open Proof Protocol

Every score in this document is source-cited. Every source is linked. If any score, data point, or source citation is incorrect, report it to contact@vyrion.earth. VYRION will publish a correction within 24 hours as a permanent, timestamped entry in the Score Changelog. No original entries are ever deleted.

Find the error. We will publish the correction.

---

*CONSCIENCE-METHODOLOGY.md · v1.1 · May 5, 2026*  
*VYRION PBC · Tyler Frost / DablerFrost · Hilo, Hawaii*  
*github.com/DablerFrost/Vyrion · About: vyrion.earth/about*
