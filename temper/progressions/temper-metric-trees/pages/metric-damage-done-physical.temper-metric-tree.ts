import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDamageDonePhysical = {
  id: "019e2fcd-598b-7284-99f2-475a34550307",
  type: "temper-metric-tree",
  slug: "metric-damage-done-physical",
  title: "Damage Done Physical",
  nodeId: "damage-done-physical",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
