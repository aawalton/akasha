import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetCriticalRating = {
  id: "01a0de67-c00c-7218-bb4e-0ff8cf823dfc",
  type: "page-type/temper-metric",
  slug: "target-critical-rating",
  title: "Target Critical Rating",
  valueType: "rating",
  polarity: "higher-is-better",
  divisor: 21912,
  cap: 1,
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
