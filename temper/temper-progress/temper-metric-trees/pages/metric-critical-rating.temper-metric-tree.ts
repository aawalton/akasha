import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalRating = {
  id: "019e2fcd-597b-7fa6-9bb4-cfc4646bc4f9",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-rating",
  title: "Critical Rating",
  nodeId: "critical-rating",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-critical-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
