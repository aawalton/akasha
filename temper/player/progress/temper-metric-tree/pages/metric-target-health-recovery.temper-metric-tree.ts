import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetHealthRecovery = {
  id: "019e2fcd-5aae-7536-b2fb-dda4ceaf9ec1",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-health-recovery",
  title: "Target Health Recovery",
  nodeId: "target-health-recovery",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-target-healing",
} as const satisfies TemperMetricTree
