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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
