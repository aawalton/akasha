import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageShieldCost = {
  id: "01a0de67-c009-70d4-94a7-0f68a9691147",
  type: "page-type/temper-metric",
  slug: "damage-shield-cost",
  title: "Damage Shield Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
