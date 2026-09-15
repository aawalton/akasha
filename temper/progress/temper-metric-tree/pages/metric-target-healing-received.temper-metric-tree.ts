import type { TemperMetricTree } from "akasha/temper/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetHealingReceived = {
  id: "019e2fcd-5aac-7f51-b3a1-9136bc2b3226",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-healing-received",
  title: "Target Healing Received",
  nodeId: "target-healing-received",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-healing",
} as const satisfies TemperMetricTree
