import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haFlameStaff = {
  id: "01a0de67-c009-78dd-93c2-df70a0340495",
  type: "page-type/temper-metric",
  slug: "ha-flame-staff",
  title: "HA Flame Staff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
