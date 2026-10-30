# Restatement — the VYRION Index baseline, v1.1

**Published October 23, 2026 · VYRION LLC**

---

## What was wrong

The VYRION Index launched on March 18, 2026 with a score of **41.3**, followed by **41.2** on March 19. Those two values were set by hand, by the founder, as a baseline judgment — and then the daily computation that was supposed to follow them was never built. The score stayed at 41.2 while the site presented it in the framing of a daily, continuously computed index.

41.2 was not a fabricated planet. It was an unpublished-methodology estimate wearing a computed number's clothes. Under VYRION's own standard — verifiability, with no unlabeled simulated data, ever — that is not good enough, and we are the ones who caught it, in an internal audit we commissioned on ourselves.

So we rebuilt it.

## What we did

We reconstructed the March 2026 baseline from the methodology's own inputs: 49 indicators across 8 Index systems, every value taken from the named public source, every threshold published, every input that could not be honestly retrieved **excluded and listed** rather than filled in. Where our own March record contained stale source values, we corrected them in the open, in the changelog, using the correction protocol that has existed since Day 1.

The reconstruction does not reproduce 41.2. It was never going to — 41.2 was a judgment, and a judgment cannot be recomputed. What can be recomputed is this:

## The restated baseline

> **VYRION Index — 49.2 / 100**
> ± 1.8 measurement uncertainty · ± 4.4 total uncertainty including methodology choices
> Baseline as of March 2026 · Methodology v1.1

| System | Score |
|---|---|
| Atmosphere | 40.9 |
| Ocean | 49.6 |
| Ice / Cryosphere | 75.4 |
| Forest | 36.1 |
| Biodiversity | 41.1 |
| Freshwater | 53.6 |
| Soil | 62.4 |
| Corporate Accountability | 34.6 |

41 of 49 indicators are scored. The 8 that are not — named in the data file — could not be retrieved as defined, and two of them turned out to be defined in ways that cannot produce a number at all. They are being replaced with defined, computable equivalents, adopted in the open in the v1.1 methodology addendum.

## What does not change

- **The historical record.** The March 2026 values — 41.3 on Day 1, 41.2 on Day 2 — remain published exactly as they were. VYRION's record is immutable; corrections are additive, never edits. Both the original values and this restatement stand side by side, labeled.
- **The verdict.** 41.2 and 49.2 fall in the same band: **CRITICAL — active degradation, intervention required.** The reconstruction does not rescue the planet's grade. It moves the number within the band and makes it defensible, line by line, to any reviewer who wants to check.
- **CONSCIENCE.** The corporate accountability dataset — 36 companies, mean 35.7 — was always computed from real filings and registries, and is untouched by this restatement. Reassuringly, when the Corporate system was rebuilt from raw indicators for this reconstruction, it scored 34.6 — within a point of the CONSCIENCE mean it is derived from.
- **The live data.** SHIELD's hazard feeds, the daily NOAA CO₂ reading, and the rest of the platform's live pipelines were always real, and still are.

## Recompute it yourself

That is the point of all of this. The full baseline — every indicator value, its source and URL, its baseline, its threshold, its score, and its data-quality tag (VERIFIED, ESTIMATED, or NOT RETRIEVABLE) — is published in machine-readable form:

**`data/index-baseline.json`** in this repository, with the methodology in `docs/VYRION-METHODOLOGY-V1.0.md` as amended by `docs/VYRION-METHODOLOGY-V1.1-ADDENDUM.md`, and the series in `data/index-history.json`.

If you find an error — in an indicator, a source, a formula, or a derivation — the Open Proof Protocol applies, as it has since Day 1: report it to **contact@vyrion.earth**, and the correction is published, timestamped, and permanent. No original entries are ever deleted.

The number was the product. Now the number can prove itself.

---

*RESTATEMENT-NOTE-V1.1.md · October 23, 2026*
*VYRION LLC · Tyler Frost / DablerFrost · Hilo, Hawaii*
*github.com/dablerfrost/Vyrion · vyrion.earth · contact@vyrion.earth*
