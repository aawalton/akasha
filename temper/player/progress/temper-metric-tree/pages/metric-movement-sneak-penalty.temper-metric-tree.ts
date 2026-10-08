import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementSneakPenalty = {
  id: "019e2fcd-5a7c-747e-a22f-6a586bacc378",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-sneak-penalty",
  title: "Sneak Penalty",
  nodeId: "movement-sneak-penalty",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-movement-sneak-speed",
  createdAt: "2026-05-16T08:00:47.740Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
