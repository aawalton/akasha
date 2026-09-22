import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricSunderedDamage = {
  id: "019e2fcd-59d8-7b27-82f3-c9be8005683a",
  type: "page-type/temper-metric-tree",
  slug: "metric-sundered-damage",
  title: "Sundered Damage",
  nodeId: "sundered-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-status-damage",
} as const satisfies TemperMetricTree
