import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneFrost = {
  id: "019e2fcd-5988-7211-94fb-30928c5b1462",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-frost",
  title: "Damage Done Frost",
  nodeId: "damage-done-frost",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
