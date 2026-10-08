import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPower = {
  id: "019e2fcd-5962-7a60-a8ac-633ee4efb026",
  type: "page-type/temper-metric-tree",
  slug: "metric-power",
  title: "Power",
  nodeId: "power",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/category-damage",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.458Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
