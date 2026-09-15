import type { TemperMetricTree } from "akasha/temper/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetAttackBonus = {
  id: "019e2fcd-5a8d-7986-9559-503d062fecfb",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-attack-bonus",
  title: "Target Attack Bonus",
  nodeId: "target-attack-bonus",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
