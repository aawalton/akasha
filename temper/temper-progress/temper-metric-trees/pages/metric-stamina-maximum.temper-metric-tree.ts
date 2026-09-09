import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaMaximum = {
  id: "019e2fcd-59fc-7ccb-b7e2-7af6686276a7",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-maximum",
  title: "Stamina Maximum",
  nodeId: "stamina-maximum",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
