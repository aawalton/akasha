import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haUnarmed = {
  id: "01a0de67-c00a-7b18-8594-c5c974ceb119",
  type: "page-type/temper-metric",
  slug: "ha-unarmed",
  title: "HA Unarmed",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
