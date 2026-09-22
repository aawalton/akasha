import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingTotal = {
  id: "019e2fcd-5a70-7907-8ba2-335a449c186f",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-total",
  title: "Healing Total",
  nodeId: "healing-total",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/category-healing",
} as const satisfies TemperMetricTree
