import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetDamageDone = {
  id: "019e2fcd-5a92-785a-ab7c-2f94f2eae086",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-damage-done",
  title: "Target Damage Done",
  nodeId: "target-damage-done",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-target-damage",
} as const satisfies TemperMetricTree
