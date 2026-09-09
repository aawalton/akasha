import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneFlame = {
  id: "019e2fcd-5987-7231-a24a-ad89bf881366",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-flame",
  title: "Damage Done Flame",
  nodeId: "damage-done-flame",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
