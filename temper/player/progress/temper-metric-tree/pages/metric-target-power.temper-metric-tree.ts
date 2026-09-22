import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetPower = {
  id: "019e2fcd-5a95-705a-b585-a173259cf87e",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-power",
  title: "Target Power",
  nodeId: "target-power",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-target-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
