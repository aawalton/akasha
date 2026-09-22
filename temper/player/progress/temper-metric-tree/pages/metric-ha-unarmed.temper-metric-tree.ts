import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaUnarmed = {
  id: "019e2fcd-59c8-77a2-97a8-77795532d6dc",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-unarmed",
  title: "Ha Unarmed",
  nodeId: "ha-unarmed",
  nodeType: "metric",
  displayOrder: 9,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
