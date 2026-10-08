import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMovementRunSpeed = {
  id: "019e2fcd-5a75-7f7a-a0b0-2a055170ed7c",
  type: "page-type/temper-metric-tree",
  slug: "metric-movement-run-speed",
  title: "Run Speed",
  nodeId: "movement-run-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-movement-speed",
  createdAt: "2026-05-16T08:00:47.733Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
