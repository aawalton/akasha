import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPower = {
  id: "019e2fcd-5a95-705a-b585-a173259cf87e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-power",
  title: "Target Power",
  nodeId: "target-power",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-target-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
