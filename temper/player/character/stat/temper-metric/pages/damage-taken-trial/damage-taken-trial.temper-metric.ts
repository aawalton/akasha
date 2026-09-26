import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenTrial = {
  id: "01a0de67-c009-721d-8545-47428c28db51",
  type: "page-type/temper-metric",
  slug: "damage-taken-trial",
  title: "Damage Taken (Trial)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
