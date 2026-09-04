import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPower = {
  id: "019e2fcd-5962-7a60-a8ac-633ee4efb026",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-power",
  title: "Power",
  nodeId: "power",
  nodeType: "metric",
  displayOrder: 1,
  parent: "category-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
