import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealthMaximum = {
  id: "019e2fcd-5a1e-7251-83bc-63ce4d7eded0",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-health-maximum",
  title: "Health Maximum",
  nodeId: "health-maximum",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-health",
} as const satisfies TemperMetricTree
