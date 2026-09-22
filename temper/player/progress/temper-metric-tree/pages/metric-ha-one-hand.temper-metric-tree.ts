import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaOneHand = {
  id: "019e2fcd-59c1-782f-8e7f-ce22d007edd3",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-one-hand",
  title: "Ha One Hand",
  nodeId: "ha-one-hand",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
