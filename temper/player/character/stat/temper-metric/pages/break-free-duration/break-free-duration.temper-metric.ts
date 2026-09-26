import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const breakFreeDuration = {
  id: "01a0de67-c008-795c-87d1-cdcca70721eb",
  type: "page-type/temper-metric",
  slug: "break-free-duration",
  title: "Break Free Duration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
