import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDonePet = {
  id: "019e2fcd-598a-717a-9f36-96b1c22836d8",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-pet",
  title: "Damage Done (Pet)",
  nodeId: "damage-done-pet",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
  createdAt: "2026-05-16T08:00:47.498Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
