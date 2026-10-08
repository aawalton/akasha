import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealthMaximum = {
  id: "019e2fcd-5a1e-7251-83bc-63ce4d7eded0",
  type: "page-type/temper-metric-tree",
  slug: "metric-health-maximum",
  title: "Max Health",
  nodeId: "health-maximum",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-health",
  createdAt: "2026-05-16T08:00:47.646Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
