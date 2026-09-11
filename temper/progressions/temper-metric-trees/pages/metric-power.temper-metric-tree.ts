import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricPower = {
  id: "019e2fcd-5962-7a60-a8ac-633ee4efb026",
  type: "temper-metric-tree",
  slug: "metric-power",
  title: "Power",
  nodeId: "power",
  nodeType: "metric",
  displayOrder: 1,
  parent: "category-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
