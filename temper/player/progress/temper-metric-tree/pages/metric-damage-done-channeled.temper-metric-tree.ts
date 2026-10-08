import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneChanneled = {
  id: "01a0d3f6-71c6-7e18-949d-3e204a88e070",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-channeled",
  title: "Damage Done (Channeled)",
  nodeId: "damage-done-channeled",
  nodeType: "metric",
  displayOrder: 10,
  parent: "temper-metric-tree/subcategory-damage-done",
  includeInChildAggregates: true,
  createdAt: "2026-09-24T15:08:58.694Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
