import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const constitution = {
  id: "01a0de67-c008-79ea-9d16-d7ecce67ecd4",
  type: "page-type/temper-metric",
  slug: "constitution",
  title: "Constitution",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
