import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricCriticalRatingSpell = {
  id: "019e2fcd-597d-701a-ac92-a156473dc490",
  type: "page-type/temper-metric-tree",
  slug: "metric-critical-rating-spell",
  title: "Critical Rating Spell",
  nodeId: "critical-rating-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-critical-rating",
} as const satisfies TemperMetricTree
