import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaDodgeCost = {
  id: "019e2fcd-59fb-7af1-9e1a-e10d6f61924a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-dodge-cost",
  title: "Stamina Dodge Cost",
  nodeId: "stamina-dodge-cost",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
