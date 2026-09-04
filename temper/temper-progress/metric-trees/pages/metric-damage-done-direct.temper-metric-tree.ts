import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneDirect = {
  id: "019e2fcd-596e-76a2-9355-92661f123a1e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-direct",
  title: "Damage Done Direct",
  nodeId: "damage-done-direct",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
