import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoreShockStaff = {
  id: "01a0de67-c00a-7431-8f8d-284769a4d8fd",
  type: "page-type/temper-metric",
  slug: "ha-restore-shock-staff",
  title: "HA Restore (Shock)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
