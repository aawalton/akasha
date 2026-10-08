import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoreUnarmed = {
  id: "01a0de67-c00a-78e0-a206-9c395bf6a896",
  type: "page-type/temper-metric",
  slug: "ha-restore-unarmed",
  title: "HA Restore (Unarmed)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
