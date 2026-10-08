import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const training = {
  id: "01a0de67-c00d-70dd-8907-d3ff7d23bc71",
  type: "page-type/temper-metric",
  slug: "training",
  title: "Training",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.461Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
