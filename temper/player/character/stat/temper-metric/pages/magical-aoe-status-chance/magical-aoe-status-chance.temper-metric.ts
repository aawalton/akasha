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
} as const satisfies TemperMetric
