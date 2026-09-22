import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStatusDuration = {
  id: "019e2fcd-59cd-7ecf-b5f8-41fc3e79aa5d",
  type: "page-type/temper-metric-tree",
  slug: "metric-status-duration",
  title: "Status Duration",
  nodeId: "status-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-status-effects",
} as const satisfies TemperMetricTree
