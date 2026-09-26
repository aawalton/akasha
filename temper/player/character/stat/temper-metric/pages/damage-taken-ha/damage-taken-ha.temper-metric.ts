import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenHa = {
  id: "01a0de67-c009-7a51-869e-be3cb4fa3072",
  type: "page-type/temper-metric",
  slug: "damage-taken-ha",
  title: "Damage Taken (Heavy Attack)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
