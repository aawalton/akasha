import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResurrectSpeed = {
  id: "019e2fcd-5a6f-72e7-b31c-cfcbc498b71e",
  type: "page-type/temper-metric-tree",
  slug: "metric-resurrect-speed",
  title: "Resurrect Time",
  nodeId: "resurrect-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-resurrection",
  createdAt: "2026-05-16T08:00:47.727Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
