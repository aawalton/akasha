import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const divines = {
  id: "01a0de67-c009-7e9d-8c2c-6d3149996e6a",
  type: "page-type/temper-metric",
  slug: "divines",
  title: "Divines",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
