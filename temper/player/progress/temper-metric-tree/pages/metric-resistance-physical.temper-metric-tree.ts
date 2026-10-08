import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistancePhysical = {
  id: "019e2fcd-5a22-7eca-b412-e966c5ab0a2b",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-physical",
  title: "Physical Resistance",
  nodeId: "resistance-physical",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-resistance",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.650Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
