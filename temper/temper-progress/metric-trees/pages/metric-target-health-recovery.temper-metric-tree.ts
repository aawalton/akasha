import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetHealthRecovery = {
  id: "019e2fcd-5aae-7536-b2fb-dda4ceaf9ec1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-health-recovery",
  title: "Target Health Recovery",
  nodeId: "target-health-recovery",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-healing",
} as const satisfies TemperMetricTree
