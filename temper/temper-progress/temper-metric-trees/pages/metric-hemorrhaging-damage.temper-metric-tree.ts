import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHemorrhagingDamage = {
  id: "019e2fcd-59d5-7752-a7fc-909d65b8db7c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-hemorrhaging-damage",
  title: "Hemorrhaging Damage",
  nodeId: "hemorrhaging-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
