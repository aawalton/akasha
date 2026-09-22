import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTaken = {
  id: "019e2fcd-5a34-795b-b1cb-c76ba3452c39",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-taken",
} as const satisfies TemperMetricTree
