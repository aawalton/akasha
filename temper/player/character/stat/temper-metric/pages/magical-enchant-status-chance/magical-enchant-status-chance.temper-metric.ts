import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magicalEnchantStatusChance = {
  id: "01a0de67-c00b-7c3b-a000-b5ae3e8df7dc",
  type: "page-type/temper-metric",
  slug: "magical-enchant-status-chance",
  title: "Magical Status Chance (Enchants)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
