import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealthMaximum = {
  id: "019e2fcd-5a1e-7251-83bc-63ce4d7eded0",
  type: "page-type/temper-metric-tree",
  slug: "metric-health-maximum",
  title: "Health Maximum",
  nodeId: "health-maximum",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-health",
} as const satisfies TemperMetricTree
