import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementSpeed = {
  id: "019e2fcd-5a74-7a81-959a-4ae23783b90f",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-speed",
  title: "Movement Speed",
  nodeId: "movement-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/category-mobility",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
