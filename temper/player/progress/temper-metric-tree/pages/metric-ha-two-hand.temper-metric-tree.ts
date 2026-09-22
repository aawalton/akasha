import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaTwoHand = {
  id: "019e2fcd-59c7-7411-b279-b4d61011d19b",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-two-hand",
  title: "Ha Two Hand",
  nodeId: "ha-two-hand",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
