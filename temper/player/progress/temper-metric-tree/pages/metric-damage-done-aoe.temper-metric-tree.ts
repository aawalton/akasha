import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneAoe = {
  id: "019e2fcd-596a-7e00-b8f7-8593a2e0396e",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-aoe",
  title: "Damage Done (AOE)",
  nodeId: "damage-done-aoe",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-done",
  createdAt: "2026-05-16T08:00:47.466Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
