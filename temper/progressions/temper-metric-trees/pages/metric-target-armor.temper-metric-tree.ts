import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricTargetArmor = {
  id: "019e2fcd-5a9e-7f67-bda5-5d03038b7458",
  type: "temper-metric-tree",
  slug: "metric-target-armor",
  title: "Target Armor",
  nodeId: "target-armor",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
