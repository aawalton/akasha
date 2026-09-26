import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const sturdy = {
  id: "01a0de67-c00c-7518-b792-a55843f57592",
  type: "page-type/temper-metric",
  slug: "sturdy",
  title: "Sturdy",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
