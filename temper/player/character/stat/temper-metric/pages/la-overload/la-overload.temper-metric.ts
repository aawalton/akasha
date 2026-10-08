import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laOverload = {
  id: "01a0de67-c00a-77b5-8a26-cc776ebc35f9",
  type: "page-type/temper-metric",
  slug: "la-overload",
  title: "LA Overload",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
