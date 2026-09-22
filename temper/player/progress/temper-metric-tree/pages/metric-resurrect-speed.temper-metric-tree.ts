import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResurrectSpeed = {
  id: "019e2fcd-5a6f-72e7-b31c-cfcbc498b71e",
  type: "page-type/temper-metric-tree",
  slug: "metric-resurrect-speed",
  title: "Resurrect Speed",
  nodeId: "resurrect-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-resurrection",
} as const satisfies TemperMetricTree
