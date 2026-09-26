import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const martialEnchantStatusChance = {
  id: "01a0de67-c00b-7dfb-8e91-7978551bb015",
  type: "page-type/temper-metric",
  slug: "martial-enchant-status-chance",
  title: "Martial Status Chance (Enchants)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
