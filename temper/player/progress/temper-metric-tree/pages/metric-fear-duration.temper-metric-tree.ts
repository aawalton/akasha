import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricFearDuration = {
  id: "019e2fcd-5ac2-7c06-9ff2-06054e039944",
  type: "page-type/temper-metric-tree",
  slug: "metric-fear-duration",
  title: "Fear Duration",
  nodeId: "fear-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-crowd-control",
} as const satisfies TemperMetricTree
