import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const martialDotStatusChance = {
  id: "01a0de67-c00b-7465-9951-83690a2f8e07",
  type: "page-type/temper-metric",
  slug: "martial-dot-status-chance",
  title: "Martial Status Chance (DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
