import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetStaminaAbilityCost = {
  id: "01a0de67-c00c-7ad8-ba83-aadec289dcac",
  type: "page-type/temper-metric",
  slug: "target-stamina-ability-cost",
  title: "Target Stamina Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
