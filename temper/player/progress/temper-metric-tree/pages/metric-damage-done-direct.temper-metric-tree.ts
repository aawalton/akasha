import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneDirect = {
  id: "019e2fcd-596e-76a2-9355-92661f123a1e",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-direct",
  title: "Damage Done Direct",
  nodeId: "damage-done-direct",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
