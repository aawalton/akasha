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
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
