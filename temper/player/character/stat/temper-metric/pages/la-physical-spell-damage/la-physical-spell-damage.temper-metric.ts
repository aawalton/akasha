import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laPhysicalSpellDamage = {
  id: "01a0de67-c00a-7e7d-88d7-98fa825e0fea",
  type: "page-type/temper-metric",
  slug: "la-physical-spell-damage",
  title: "LA Physical Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
