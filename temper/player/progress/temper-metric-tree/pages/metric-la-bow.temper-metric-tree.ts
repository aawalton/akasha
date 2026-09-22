import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaBow = {
  id: "019e2fcd-599b-764f-81f7-8a11692063e2",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-bow",
  title: "La Bow",
  nodeId: "la-bow",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
