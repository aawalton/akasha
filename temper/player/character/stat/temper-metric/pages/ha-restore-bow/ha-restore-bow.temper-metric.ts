import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoreBow = {
  id: "01a0de67-c00a-7dd6-8053-a4d489904d3e",
  type: "page-type/temper-metric",
  slug: "ha-restore-bow",
  title: "HA Restore (Bow)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
