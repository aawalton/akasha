import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPoisonedDuration = {
  id: "019e2fcd-59ce-7fa7-a05c-55a69e9e04e1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-poisoned-duration",
  title: "Poisoned Duration",
  nodeId: "poisoned-duration",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-status-effects",
} as const satisfies TemperMetricTree
