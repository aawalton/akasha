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
} as const satisfies TemperMetric
