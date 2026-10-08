import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetPower = {
  id: "019e2fcd-5a95-705a-b585-a173259cf87e",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-power",
  title: "Target Power",
  nodeId: "target-power",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-target-damage",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.765Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
