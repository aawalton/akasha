import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneFlame = {
  id: "019e2fcd-5987-7231-a24a-ad89bf881366",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-flame",
  title: "Damage Done Flame",
  nodeId: "damage-done-flame",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
