import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDonePet = {
  id: "019e2fcd-598a-717a-9f36-96b1c22836d8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-pet",
  title: "Damage Done Pet",
  nodeId: "damage-done-pet",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
