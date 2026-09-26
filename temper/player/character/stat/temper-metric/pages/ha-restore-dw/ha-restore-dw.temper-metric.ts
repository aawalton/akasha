import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoreDw = {
  id: "01a0de67-c00a-75b9-9a26-7da2cf6f698f",
  type: "page-type/temper-metric",
  slug: "ha-restore-dw",
  title: "HA Restore (DW)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
