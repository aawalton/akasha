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
} as const satisfies TemperMetric
