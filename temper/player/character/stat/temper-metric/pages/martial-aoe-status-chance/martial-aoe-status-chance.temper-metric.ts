import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const martialAoeStatusChance = {
  id: "01a0de67-c00b-7cfc-a882-1df5c617b3b7",
  type: "page-type/temper-metric",
  slug: "martial-aoe-status-chance",
  title: "Martial Status Chance (AOE)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
