import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBlockSpeed = {
  id: "019e2fcd-5a85-7fba-8df2-9efec9dd92e6",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-block-speed",
  title: "Block Speed",
  nodeId: "block-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-block",
} as const satisfies TemperMetricTree
