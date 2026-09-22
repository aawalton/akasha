import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingReceivedBase = {
  id: "019e2fcd-5a68-7a8f-b2d2-6f6d55d4d5c7",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-received-base",
  title: "Healing Received Base",
  nodeId: "healing-received-base",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-healing-received",
} as const satisfies TemperMetricTree
