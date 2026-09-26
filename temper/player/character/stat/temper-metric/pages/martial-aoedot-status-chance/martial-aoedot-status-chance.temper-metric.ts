import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const martialAoedotStatusChance = {
  id: "01a0de67-c00b-70da-9c9c-bfb9a5a8f40d",
  type: "page-type/temper-metric",
  slug: "martial-aoedot-status-chance",
  title: "Martial Status Chance (AOE+DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
