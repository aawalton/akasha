import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistance = {
  id: "019e2fcd-5a20-779a-bb2f-3ebf355ce12f",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance",
  title: "Armor",
  nodeId: "resistance",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/category-toughness",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.648Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
