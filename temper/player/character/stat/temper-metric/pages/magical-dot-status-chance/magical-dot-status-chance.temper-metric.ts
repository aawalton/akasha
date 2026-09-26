import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magicalDotStatusChance = {
  id: "01a0de67-c00b-7e72-ab5d-966aee967d2e",
  type: "page-type/temper-metric",
  slug: "magical-dot-status-chance",
  title: "Magical Status Chance (DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
