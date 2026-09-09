import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricFearDuration = {
  id: "019e2fcd-5ac2-7c06-9ff2-06054e039944",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-fear-duration",
  title: "Fear Duration",
  nodeId: "fear-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-crowd-control",
} as const satisfies TemperMetricTree
