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
} as const satisfies TemperMetric
