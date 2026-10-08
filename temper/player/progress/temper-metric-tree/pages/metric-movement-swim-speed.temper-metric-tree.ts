import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementSwimSpeed = {
  id: "019e2fcd-5a77-7473-89b5-fff5d6256a00",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-swim-speed",
  title: "Swim Speed",
  nodeId: "movement-swim-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-movement-speed",
  createdAt: "2026-05-16T08:00:47.735Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
