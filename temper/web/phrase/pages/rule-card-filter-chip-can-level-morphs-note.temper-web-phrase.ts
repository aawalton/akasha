import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const ruleCardFilterChipCanLevelMorphsNote = {
  id: "01a0e2ae-aba4-7a3d-8688-c33794db0100",
  type: "page-type/temper-web-phrase",
  slug: "rule-card-filter-chip-can-level-morphs-note",
  title: "What Can Level Morphs checks",
  description:
    "Per-character readiness predicate. The character passes when it has unmaxed morphable skills (any morph pair where the current rank is below the maximum). Used at allocation time to gate per-character stock distribution.",
  createdAt: "2026-09-27T11:44:53.156Z",
  updatedAt: "2026-09-27T11:45:01.000Z",
} as const satisfies TemperWebPhrase
