import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResurrectSpeed = {
  id: "019e2fcd-5a6f-72e7-b31c-cfcbc498b71e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resurrect-speed",
  title: "Resurrect Speed",
  nodeId: "resurrect-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-resurrection",
} as const satisfies TemperMetricTree
