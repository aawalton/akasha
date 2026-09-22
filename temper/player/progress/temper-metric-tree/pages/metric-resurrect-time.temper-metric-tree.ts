import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResurrectTime = {
  id: "019e2fcd-5a6d-7dbc-8202-877cce03268d",
  type: "page-type/temper-metric-tree",
  slug: "metric-resurrect-time",
  title: "Resurrect Time",
  nodeId: "resurrect-time",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-resurrection",
} as const satisfies TemperMetricTree
