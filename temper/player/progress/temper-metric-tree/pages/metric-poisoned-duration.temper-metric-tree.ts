import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPoisonedDuration = {
  id: "019e2fcd-59ce-7fa7-a05c-55a69e9e04e1",
  type: "page-type/temper-metric-tree",
  slug: "metric-poisoned-duration",
  title: "Poisoned Duration",
  nodeId: "poisoned-duration",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-status-effects",
} as const satisfies TemperMetricTree
