import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBlockMitigation = {
  id: "019e2fcd-5a84-7c29-a2f2-552f18ee26f4",
  type: "page-type/temper-metric-tree",
  slug: "metric-block-mitigation",
  title: "Block Mitigation",
  nodeId: "block-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-block",
} as const satisfies TemperMetricTree
