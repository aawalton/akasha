import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricSunderedDamage = {
  id: "019e2fcd-59d8-7b27-82f3-c9be8005683a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-sundered-damage",
  title: "Sundered Damage",
  nodeId: "sundered-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
