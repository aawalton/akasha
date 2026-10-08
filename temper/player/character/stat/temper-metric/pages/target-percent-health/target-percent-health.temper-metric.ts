import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetPercentHealth = {
  id: "01a0de67-c00c-7bee-a4b6-ff7774ce542c",
  type: "page-type/temper-metric",
  slug: "target-percent-health",
  title: "Target Health Percentage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
