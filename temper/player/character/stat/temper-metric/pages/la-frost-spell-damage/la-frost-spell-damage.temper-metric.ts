import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laFrostSpellDamage = {
  id: "01a0de67-c00a-7846-a0e7-215d813e6563",
  type: "page-type/temper-metric",
  slug: "la-frost-spell-damage",
  title: "LA Frost Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
