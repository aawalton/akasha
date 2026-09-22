import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetArmor = {
  id: "019e2fcd-5a9e-7f67-bda5-5d03038b7458",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-armor",
  title: "Target Armor",
  nodeId: "target-armor",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-target-toughness",
} as const satisfies TemperMetricTree
