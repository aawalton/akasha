import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricCriticalDamage = {
  id: "019e2fcd-5979-703e-9e83-902a746430e4",
  type: "page-type/temper-metric-tree",
  slug: "metric-critical-damage",
  title: "Critical Damage",
  nodeId: "critical-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-critical-damage",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.481Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
