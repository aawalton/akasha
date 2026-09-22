import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricCriticalRating = {
  id: "019e2fcd-597b-7fa6-9bb4-cfc4646bc4f9",
  type: "page-type/temper-metric-tree",
  slug: "metric-critical-rating",
  title: "Critical Rating",
  nodeId: "critical-rating",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-critical-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
