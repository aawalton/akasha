import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haBow = {
  id: "01a0de67-c009-75c8-a84b-c2d5cb678bd8",
  type: "page-type/temper-metric",
  slug: "ha-bow",
  title: "HA Bow",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
