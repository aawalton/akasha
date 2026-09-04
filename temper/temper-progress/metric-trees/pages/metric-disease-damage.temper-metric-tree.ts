import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDiseaseDamage = {
  id: "019e2fcd-59d4-765c-9a94-f796bb4af337",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-disease-damage",
  title: "Disease Damage",
  nodeId: "disease-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
