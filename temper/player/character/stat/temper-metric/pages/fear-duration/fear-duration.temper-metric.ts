import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const fearDuration = {
  id: "01a0de67-c009-7bfe-a659-026e75c97d2d",
  type: "page-type/temper-metric",
  slug: "fear-duration",
  title: "Fear Duration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
