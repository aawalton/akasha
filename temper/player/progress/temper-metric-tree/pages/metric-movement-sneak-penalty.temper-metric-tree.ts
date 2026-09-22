import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementSneakPenalty = {
  id: "019e2fcd-5a7c-747e-a22f-6a586bacc378",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-sneak-penalty",
  title: "Movement Sneak Penalty",
  nodeId: "movement-sneak-penalty",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-movement-sneak-speed",
} as const satisfies TemperMetricTree
