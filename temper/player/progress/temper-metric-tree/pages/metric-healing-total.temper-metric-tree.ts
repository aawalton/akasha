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
  createdAt: "2026-05-16T08:00:47.728Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
