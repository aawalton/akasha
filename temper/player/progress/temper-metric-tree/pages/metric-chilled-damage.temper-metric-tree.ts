import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricChilledDamage = {
  id: "019e2fcd-59d2-73fd-b1a5-697035be8c35",
  type: "page-type/temper-metric-tree",
  slug: "metric-chilled-damage",
  title: "Chilled Damage",
  nodeId: "chilled-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-status-damage",
  createdAt: "2026-05-16T08:00:47.570Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
