import type { TemperMetricTree } from "../temper-metric-tree.page-type.types.ts"

export const metricHealingTotal = {
  id: "019e2fcd-5a70-7907-8ba2-335a449c186f",
  pageTypeSlug: "temper-metric-tree",
  type: "temper-metric-tree",
  slug: "metric-healing-total",
  title: "Healing Total",
  nodeId: "healing-total",
  nodeType: "metric",
  displayOrder: 6,
  parent: "category-healing",
} as const satisfies TemperMetricTree
