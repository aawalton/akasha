import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricBurningDamage = {
  id: "019e2fcd-59d1-72f8-86dc-0707ff81b11a",
  type: "temper-metric-tree",
  slug: "metric-burning-damage",
  title: "Burning Damage",
  nodeId: "burning-damage",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
