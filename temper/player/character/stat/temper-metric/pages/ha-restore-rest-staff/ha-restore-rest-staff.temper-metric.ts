import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoreRestStaff = {
  id: "01a0de67-c00a-7d79-81de-caf96d4773a3",
  type: "page-type/temper-metric",
  slug: "ha-restore-rest-staff",
  title: "HA Restore (Rest)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
