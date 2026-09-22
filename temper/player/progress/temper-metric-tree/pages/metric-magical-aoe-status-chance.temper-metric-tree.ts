import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagicalAoeStatusChance = {
  id: "019e2fcd-59dc-70e2-b43d-02197d080797",
  type: "page-type/temper-metric-tree",
  slug: "metric-magical-aoe-status-chance",
  title: "Magical Aoe Status Chance",
  nodeId: "magical-aoe-status-chance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-magical-status-chance",
} as const satisfies TemperMetricTree
