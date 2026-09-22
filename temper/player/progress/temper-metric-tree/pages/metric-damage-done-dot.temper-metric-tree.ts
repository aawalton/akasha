import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneDot = {
  id: "019e2fcd-596f-7ca2-88b9-716d84be3ba4",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-dot",
  title: "Damage Done Dot",
  nodeId: "damage-done-dot",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
