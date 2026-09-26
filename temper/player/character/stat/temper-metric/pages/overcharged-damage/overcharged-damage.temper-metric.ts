import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const overchargedDamage = {
  id: "01a0de67-c00b-7be2-aba2-25f3ee9b1ee4",
  type: "page-type/temper-metric",
  slug: "overcharged-damage",
  title: "Overcharged Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
