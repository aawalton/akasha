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
} as const satisfies TemperMetricTree
