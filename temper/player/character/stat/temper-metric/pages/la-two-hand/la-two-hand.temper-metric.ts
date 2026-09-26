import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laTwoHand = {
  id: "01a0de67-c00b-7bc7-9923-42c807b89b36",
  type: "page-type/temper-metric",
  slug: "la-two-hand",
  title: "LA Two Hand",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
