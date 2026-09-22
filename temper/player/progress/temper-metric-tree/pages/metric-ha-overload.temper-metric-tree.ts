import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaOverload = {
  id: "019e2fcd-59c3-7365-9c25-46f62160810b",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-overload",
  title: "Ha Overload",
  nodeId: "ha-overload",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
