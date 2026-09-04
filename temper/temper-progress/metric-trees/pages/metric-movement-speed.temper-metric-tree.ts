import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementSpeed = {
  id: "019e2fcd-5a74-7a81-959a-4ae23783b90f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-speed",
  title: "Movement Speed",
  nodeId: "movement-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "category-mobility",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
