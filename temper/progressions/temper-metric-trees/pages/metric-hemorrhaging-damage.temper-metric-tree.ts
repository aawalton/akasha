import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHemorrhagingDamage = {
  id: "019e2fcd-59d5-7752-a7fc-909d65b8db7c",
  type: "temper-metric-tree",
  slug: "metric-hemorrhaging-damage",
  title: "Hemorrhaging Damage",
  nodeId: "hemorrhaging-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
