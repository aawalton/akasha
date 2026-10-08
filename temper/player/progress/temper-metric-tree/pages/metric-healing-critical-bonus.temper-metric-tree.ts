import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingCriticalBonus = {
  id: "019e2fcd-5a63-7b2f-b643-8461eeb4f00b",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-critical-bonus",
  title: "Healing Critical Bonus",
  nodeId: "healing-critical-bonus",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-healing-critical",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.715Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
