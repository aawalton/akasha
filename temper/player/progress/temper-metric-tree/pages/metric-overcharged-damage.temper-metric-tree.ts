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
  createdAt: "2026-05-16T08:00:47.574Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
