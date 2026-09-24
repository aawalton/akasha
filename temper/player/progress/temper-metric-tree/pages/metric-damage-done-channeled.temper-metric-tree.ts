import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneChanneled = {
  id: "01a0d3f6-71c6-7e18-949d-3e204a88e070",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-channeled",
  title: "Damage Done Channeled",
  nodeId: "damage-done-channeled",
  nodeType: "metric",
  displayOrder: 10,
  parent: "temper-metric-tree/subcategory-damage-done",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
