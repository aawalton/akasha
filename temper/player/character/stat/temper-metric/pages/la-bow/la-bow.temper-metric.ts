import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laBow = {
  id: "01a0de67-c00a-71cb-870a-15804c7e02ff",
  type: "page-type/temper-metric",
  slug: "la-bow",
  title: "LA Bow",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
