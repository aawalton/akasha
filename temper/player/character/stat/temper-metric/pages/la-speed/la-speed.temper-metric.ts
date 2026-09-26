import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laSpeed = {
  id: "01a0de67-c00b-79c5-91fa-f11c29eaaf20",
  type: "page-type/temper-metric",
  slug: "la-speed",
  title: "LA Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
