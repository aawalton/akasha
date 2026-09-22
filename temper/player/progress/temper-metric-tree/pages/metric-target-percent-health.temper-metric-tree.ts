import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetPercentHealth = {
  id: "019e2fcd-5ab2-752d-9c01-666ab6169fb1",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-percent-health",
  title: "Target Percent Health",
  nodeId: "target-percent-health",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-target-other",
} as const satisfies TemperMetricTree
