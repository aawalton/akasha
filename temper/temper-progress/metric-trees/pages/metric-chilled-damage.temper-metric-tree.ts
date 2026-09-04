import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricChilledDamage = {
  id: "019e2fcd-59d2-73fd-b1a5-697035be8c35",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-chilled-damage",
  title: "Chilled Damage",
  nodeId: "chilled-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
