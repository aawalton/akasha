import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDiseaseDamage = {
  id: "019e2fcd-59d4-765c-9a94-f796bb4af337",
  type: "page-type/temper-metric-tree",
  slug: "metric-disease-damage",
  title: "Disease Damage",
  nodeId: "disease-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-status-damage",
} as const satisfies TemperMetricTree
