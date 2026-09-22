import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBlockCostReduction = {
  id: "019e2fcd-5a83-78bb-b7e6-668af06796e2",
  type: "page-type/temper-metric-tree",
  slug: "metric-block-cost-reduction",
  title: "Block Cost Reduction",
  nodeId: "block-cost-reduction",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-block",
} as const satisfies TemperMetricTree
