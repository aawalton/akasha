import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneMagic = {
  id: "019e2fcd-5989-71ba-a268-2f6e9d130e5f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-magic",
  title: "Damage Done Magic",
  nodeId: "damage-done-magic",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
