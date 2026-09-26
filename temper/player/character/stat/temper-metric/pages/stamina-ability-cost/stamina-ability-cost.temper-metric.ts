import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaAbilityCost = {
  id: "01a0de67-c00c-784c-a96f-7baa67006f88",
  type: "page-type/temper-metric",
  slug: "stamina-ability-cost",
  title: "Stamina Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
