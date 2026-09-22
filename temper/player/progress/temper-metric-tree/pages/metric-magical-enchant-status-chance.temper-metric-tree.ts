import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagicalEnchantStatusChance = {
  id: "019e2fcd-59df-77e4-8d1c-3be85cf6cf97",
  type: "page-type/temper-metric-tree",
  slug: "metric-magical-enchant-status-chance",
  title: "Magical Enchant Status Chance",
  nodeId: "magical-enchant-status-chance",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-magical-status-chance",
} as const satisfies TemperMetricTree
