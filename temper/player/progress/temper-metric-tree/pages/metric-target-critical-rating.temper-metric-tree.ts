import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetCriticalRating = {
  id: "019e2fcd-5a91-74a5-b3d2-40862f79e60d",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-critical-rating",
  title: "Target Critical Rating",
  nodeId: "target-critical-rating",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-target-damage",
} as const satisfies TemperMetricTree
