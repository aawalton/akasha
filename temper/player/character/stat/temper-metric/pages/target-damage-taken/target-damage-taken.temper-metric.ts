import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetDamageTaken = {
  id: "01a0de67-c00c-7434-a9bd-b885d1d71773",
  type: "page-type/temper-metric",
  slug: "target-damage-taken",
  title: "Target Damage Taken",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
