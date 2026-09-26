import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haFrostStaff = {
  id: "01a0de67-c009-746c-b173-61669a000aea",
  type: "page-type/temper-metric",
  slug: "ha-frost-staff",
  title: "HA Frost Staff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
