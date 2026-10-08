import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBlockSpeed = {
  id: "019e2fcd-5a85-7fba-8df2-9efec9dd92e6",
  type: "page-type/temper-metric-tree",
  slug: "metric-block-speed",
  title: "Block Speed",
  nodeId: "block-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-block",
  createdAt: "2026-05-16T08:00:47.749Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
