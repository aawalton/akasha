import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneMagic = {
  id: "019e2fcd-5989-71ba-a268-2f6e9d130e5f",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-magic",
  title: "Damage Done (Magic)",
  nodeId: "damage-done-magic",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
  createdAt: "2026-05-16T08:00:47.497Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
