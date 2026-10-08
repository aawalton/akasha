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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
