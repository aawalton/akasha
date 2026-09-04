import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDonePoison = {
  id: "019e2fcd-598c-7310-9e23-022b29a67dc9",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-poison",
  title: "Damage Done Poison",
  nodeId: "damage-done-poison",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
