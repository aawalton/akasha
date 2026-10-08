import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magicalAoeStatusChance = {
  id: "01a0de67-c00b-7235-a603-c34e854effdf",
  type: "page-type/temper-metric",
  slug: "magical-aoe-status-chance",
  title: "Magical Status Chance (AOE)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
