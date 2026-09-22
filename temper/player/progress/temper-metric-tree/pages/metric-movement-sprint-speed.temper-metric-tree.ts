import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementSprintSpeed = {
  id: "019e2fcd-5a79-7d6a-90f8-63dfdd43cf19",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-sprint-speed",
  title: "Movement Sprint Speed",
  nodeId: "movement-sprint-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/category-mobility",
} as const satisfies TemperMetricTree
