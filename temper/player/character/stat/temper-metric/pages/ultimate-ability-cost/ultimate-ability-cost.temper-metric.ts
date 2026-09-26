import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const ultimateAbilityCost = {
  id: "01a0de67-c00d-70a0-8249-701b514414f0",
  type: "page-type/temper-metric",
  slug: "ultimate-ability-cost",
  title: "Ultimate Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
