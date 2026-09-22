import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDonePhysical = {
  id: "019e2fcd-598b-7284-99f2-475a34550307",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-physical",
  title: "Damage Done Physical",
  nodeId: "damage-done-physical",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
