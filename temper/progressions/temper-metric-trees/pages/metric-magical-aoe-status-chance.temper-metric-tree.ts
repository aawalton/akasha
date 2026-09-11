import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricMagicalAoeStatusChance = {
  id: "019e2fcd-59dc-70e2-b43d-02197d080797",
  pageTypeSlug: "temper-metric-tree",
  type: "temper-metric-tree",
  slug: "metric-magical-aoe-status-chance",
  title: "Magical Aoe Status Chance",
  nodeId: "magical-aoe-status-chance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-magical-status-chance",
} as const satisfies TemperMetricTree
