import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusDuration = {
  id: "01a0de67-c00c-7e63-9836-51438ee7d2f0",
  type: "page-type/temper-metric",
  slug: "status-duration",
  title: "Status Duration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
