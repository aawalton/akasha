import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTraining = {
  id: "019e2fcd-5abe-7f40-b136-2cfa2157aaff",
  type: "page-type/temper-metric-tree",
  slug: "metric-training",
  title: "Training",
  nodeId: "training",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-traits",
} as const satisfies TemperMetricTree
