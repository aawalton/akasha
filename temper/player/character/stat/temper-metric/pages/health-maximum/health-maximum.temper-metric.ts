import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healthMaximum = {
  id: "01a0de67-c00a-7e58-9db9-d10b6ca574c6",
  type: "page-type/temper-metric",
  slug: "health-maximum",
  title: "Max Health",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_HEALTH_MAX",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
