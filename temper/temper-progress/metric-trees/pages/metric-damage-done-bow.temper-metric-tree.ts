import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneBow = {
  id: "019e2fcd-5985-709e-9fa9-52e70b6ac8a8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-bow",
  title: "Damage Done Bow",
  nodeId: "damage-done-bow",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
