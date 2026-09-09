import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneBase = {
  id: "019e2fcd-596d-72e3-b739-ddce4d2df4bd",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-base",
  title: "Damage Done Base",
  nodeId: "damage-done-base",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
