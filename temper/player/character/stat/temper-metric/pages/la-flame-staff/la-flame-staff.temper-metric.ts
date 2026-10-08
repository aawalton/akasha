import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laFlameStaff = {
  id: "01a0de67-c00a-7b52-8e64-cd1436f555b8",
  type: "page-type/temper-metric",
  slug: "la-flame-staff",
  title: "LA Flame Staff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
