import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneStatusEffect = {
  id: "01a0d3f6-799b-7414-a642-b244bfd1eaaf",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-status-effect",
  title: "Damage Done Status Effect",
  nodeId: "damage-done-status-effect",
  nodeType: "metric",
  displayOrder: 11,
  parent: "temper-metric-tree/subcategory-damage-done",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
