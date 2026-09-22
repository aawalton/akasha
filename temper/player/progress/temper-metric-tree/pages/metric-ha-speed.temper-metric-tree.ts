import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaSpeed = {
  id: "019e2fcd-59ca-7b5d-9243-c920f429e9c1",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-speed",
  title: "Ha Speed",
  nodeId: "ha-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
