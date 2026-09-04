import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetResistance = {
  id: "019e2fcd-5aa4-70d1-a9a7-c4b802a29b5c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-resistance",
  title: "Target Resistance",
  nodeId: "target-resistance",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-target-toughness",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
