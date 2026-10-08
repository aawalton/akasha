import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestore2h = {
  id: "01a0de67-c00a-726d-9822-9e442f860311",
  type: "page-type/temper-metric",
  slug: "ha-restore-2h",
  title: "HA Restore (2H)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
