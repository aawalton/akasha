import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingReductionBase = {
  id: "019e2fcd-5a6b-73b0-9d82-9d020ef4dbbe",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-reduction-base",
  title: "Healing Reduction Base",
  nodeId: "healing-reduction-base",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/category-healing",
} as const satisfies TemperMetricTree
