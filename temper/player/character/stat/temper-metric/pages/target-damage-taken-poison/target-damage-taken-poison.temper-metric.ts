import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetDamageTakenPoison = {
  id: "01a0de67-c00c-7232-ad47-c9f891e3b484",
  type: "page-type/temper-metric",
  slug: "target-damage-taken-poison",
  title: "Target Damage Taken (Poison)",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
