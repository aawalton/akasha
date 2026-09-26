import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaNonCoreAbilityCost = {
  id: "01a0de67-c00c-751b-8737-fc8f6c130f1d",
  type: "page-type/temper-metric",
  slug: "stamina-non-core-ability-cost",
  title: "Stamina Non-Core Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
