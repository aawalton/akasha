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
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
