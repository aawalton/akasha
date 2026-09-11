import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricTraining = {
  id: "019e2fcd-5abe-7f40-b136-2cfa2157aaff",
  type: "temper-metric-tree",
  slug: "metric-training",
  title: "Training",
  nodeId: "training",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-traits",
} as const satisfies TemperMetricTree
