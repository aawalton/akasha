import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricGoldGain = {
  id: "01a0d3f6-693e-7d22-b79a-d74fd3d580cc",
  type: "page-type/temper-metric-tree",
  slug: "metric-gold-gain",
  title: "Gold Gain",
  nodeId: "gold-gain",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/category-other",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
