import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneBase = {
  id: "019e2fcd-596d-72e3-b739-ddce4d2df4bd",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-base",
  title: "Damage Done",
  nodeId: "damage-done-base",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-damage-done",
  createdAt: "2026-05-16T08:00:47.469Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
