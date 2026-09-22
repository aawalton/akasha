import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBurningDamage = {
  id: "019e2fcd-59d1-72f8-86dc-0707ff81b11a",
  type: "page-type/temper-metric-tree",
  slug: "metric-burning-damage",
  title: "Burning Damage",
  nodeId: "burning-damage",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-status-damage",
} as const satisfies TemperMetricTree
