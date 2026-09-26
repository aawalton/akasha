import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magicalAoedotStatusChance = {
  id: "01a0de67-c00b-7595-8d24-5dedb099adab",
  type: "page-type/temper-metric",
  slug: "magical-aoedot-status-chance",
  title: "Magical Status Chance (AOE+DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
