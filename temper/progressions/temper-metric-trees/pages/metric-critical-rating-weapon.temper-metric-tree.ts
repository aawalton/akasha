import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricCriticalRatingWeapon = {
  id: "019e2fcd-597d-7fa7-b954-d99b295e3d3c",
  type: "temper-metric-tree",
  slug: "metric-critical-rating-weapon",
  title: "Critical Rating Weapon",
  nodeId: "critical-rating-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-critical-rating",
} as const satisfies TemperMetricTree
