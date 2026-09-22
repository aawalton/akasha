import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenDirect = {
  id: "019e2fcd-5a36-7e51-81d7-8d338a3be735",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-direct",
  title: "Damage Taken Direct",
  nodeId: "damage-taken-direct",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-damage-taken",
} as const satisfies TemperMetricTree
