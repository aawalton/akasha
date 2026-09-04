import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetDamageTakenPoison = {
  id: "019e2fcd-5aaa-770e-b33f-b9b67efcd49b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-damage-taken-poison",
  title: "Target Damage Taken Poison",
  nodeId: "target-damage-taken-poison",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
