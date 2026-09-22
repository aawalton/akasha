import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementRunSpeed = {
  id: "019e2fcd-5a75-7f7a-a0b0-2a055170ed7c",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-run-speed",
  title: "Movement Run Speed",
  nodeId: "movement-run-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-movement-speed",
} as const satisfies TemperMetricTree
