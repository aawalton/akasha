import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDonePoison = {
  id: "019e2fcd-598c-7310-9e23-022b29a67dc9",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-poison",
  title: "Damage Done (Poison)",
  nodeId: "damage-done-poison",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
  createdAt: "2026-05-16T08:00:47.500Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
