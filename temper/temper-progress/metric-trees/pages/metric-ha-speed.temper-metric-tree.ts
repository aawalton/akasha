import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaSpeed = {
  id: "019e2fcd-59ca-7b5d-9243-c920f429e9c1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-speed",
  title: "Ha Speed",
  nodeId: "ha-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
