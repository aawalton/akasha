import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenDirect = {
  id: "019e2fcd-5a36-7e51-81d7-8d338a3be735",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-direct",
  title: "Damage Taken Direct",
  nodeId: "damage-taken-direct",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
