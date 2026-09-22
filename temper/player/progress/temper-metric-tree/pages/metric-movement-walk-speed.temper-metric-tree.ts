import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementWalkSpeed = {
  id: "019e2fcd-5a78-79f2-8821-ab22dcf3d6ba",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-walk-speed",
  title: "Movement Walk Speed",
  nodeId: "movement-walk-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/metric-movement-speed",
} as const satisfies TemperMetricTree
