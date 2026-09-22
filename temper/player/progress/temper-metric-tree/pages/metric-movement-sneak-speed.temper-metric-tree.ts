import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementSneakSpeed = {
  id: "019e2fcd-5a7b-713a-b0ef-e950bf15d3d8",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-sneak-speed",
  title: "Movement Sneak Speed",
  nodeId: "movement-sneak-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/category-mobility",
} as const satisfies TemperMetricTree
