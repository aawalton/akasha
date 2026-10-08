import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laFrostStaff = {
  id: "01a0de67-c00a-703a-8a6e-e538d3883c6e",
  type: "page-type/temper-metric",
  slug: "la-frost-staff",
  title: "LA Frost Staff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
