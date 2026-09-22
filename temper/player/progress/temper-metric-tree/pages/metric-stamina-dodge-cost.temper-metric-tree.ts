import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaDodgeCost = {
  id: "019e2fcd-59fb-7af1-9e1a-e10d6f61924a",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-dodge-cost",
  title: "Stamina Dodge Cost",
  nodeId: "stamina-dodge-cost",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-stamina",
} as const satisfies TemperMetricTree
