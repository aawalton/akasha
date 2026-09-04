import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDonePhysical = {
  id: "019e2fcd-598b-7284-99f2-475a34550307",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-physical",
  title: "Damage Done Physical",
  nodeId: "damage-done-physical",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
