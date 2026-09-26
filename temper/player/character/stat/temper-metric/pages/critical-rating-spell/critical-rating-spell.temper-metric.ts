import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalRatingSpell = {
  id: "01a0de67-c008-77d1-83f0-9f09e5162858",
  type: "page-type/temper-metric",
  slug: "critical-rating-spell",
  title: "Spell Critical Rating",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_SPELL_CRITICAL",
  divisor: 21912,
  cap: 1,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
