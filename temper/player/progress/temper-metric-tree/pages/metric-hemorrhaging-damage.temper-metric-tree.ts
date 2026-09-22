import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHemorrhagingDamage = {
  id: "019e2fcd-59d5-7752-a7fc-909d65b8db7c",
  type: "page-type/temper-metric-tree",
  slug: "metric-hemorrhaging-damage",
  title: "Hemorrhaging Damage",
  nodeId: "hemorrhaging-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-status-damage",
} as const satisfies TemperMetricTree
