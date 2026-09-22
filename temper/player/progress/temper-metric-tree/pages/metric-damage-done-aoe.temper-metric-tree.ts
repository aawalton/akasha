import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneAoe = {
  id: "019e2fcd-596a-7e00-b8f7-8593a2e0396e",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-aoe",
  title: "Damage Done Aoe",
  nodeId: "damage-done-aoe",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
