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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
