import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoreFireFrostStaff = {
  id: "01a0de67-c00a-78bf-a984-4a26952db553",
  type: "page-type/temper-metric",
  slug: "ha-restore-fire-frost-staff",
  title: "HA Restore (Fire/Frost)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
