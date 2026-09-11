import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneDisease = {
  id: "019e2fcd-5986-7271-aed6-8c95c8e521a9",
  type: "temper-metric-tree",
  slug: "metric-damage-done-disease",
  title: "Damage Done Disease",
  nodeId: "damage-done-disease",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
