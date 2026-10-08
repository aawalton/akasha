import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceDisease = {
  id: "019e2fcd-5a25-7456-9671-6e8eb5339a1a",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-disease",
  title: "Disease Resistance",
  nodeId: "resistance-disease",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-resistance-physical",
  createdAt: "2026-05-16T08:00:47.653Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
