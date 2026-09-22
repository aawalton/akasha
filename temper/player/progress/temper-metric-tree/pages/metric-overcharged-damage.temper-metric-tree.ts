import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricOverchargedDamage = {
  id: "019e2fcd-59d6-7849-b439-b65ed0480415",
  type: "page-type/temper-metric-tree",
  slug: "metric-overcharged-damage",
  title: "Overcharged Damage",
  nodeId: "overcharged-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-status-damage",
} as const satisfies TemperMetricTree
