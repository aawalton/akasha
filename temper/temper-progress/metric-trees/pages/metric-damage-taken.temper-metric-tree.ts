import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTaken = {
  id: "019e2fcd-5a34-795b-b1cb-c76ba3452c39",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
