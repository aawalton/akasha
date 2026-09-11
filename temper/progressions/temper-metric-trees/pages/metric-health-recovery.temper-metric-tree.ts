import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHealthRecovery = {
  id: "019e2fcd-5a71-7de8-850d-77e1dc0cd994",
  type: "temper-metric-tree",
  slug: "metric-health-recovery",
  title: "Health Recovery",
  nodeId: "health-recovery",
  nodeType: "metric",
  displayOrder: 7,
  parent: "category-healing",
} as const satisfies TemperMetricTree
