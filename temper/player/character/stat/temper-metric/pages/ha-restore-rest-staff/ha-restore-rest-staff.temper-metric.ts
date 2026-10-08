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
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
