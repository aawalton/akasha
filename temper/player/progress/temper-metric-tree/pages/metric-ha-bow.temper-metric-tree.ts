import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaBow = {
  id: "019e2fcd-59ba-7cbc-9512-2e65587b7eaf",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-bow",
  title: "Ha Bow",
  nodeId: "ha-bow",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
