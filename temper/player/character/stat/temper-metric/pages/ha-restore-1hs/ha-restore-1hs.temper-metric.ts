import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestore1hs = {
  id: "01a0de67-c00a-733d-965b-4191dc70e444",
  type: "page-type/temper-metric",
  slug: "ha-restore-1hs",
  title: "HA Restore (1HS)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
