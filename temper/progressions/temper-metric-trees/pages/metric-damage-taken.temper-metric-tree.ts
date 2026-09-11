import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDamageTaken = {
  id: "019e2fcd-5a34-795b-b1cb-c76ba3452c39",
  type: "temper-metric-tree",
  slug: "metric-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
