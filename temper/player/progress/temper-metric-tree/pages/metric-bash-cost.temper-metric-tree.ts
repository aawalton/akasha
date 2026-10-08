import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBashCost = {
  id: "01a0d3f6-55de-7da3-a627-c4bb8aa1d700",
  type: "page-type/temper-metric-tree",
  slug: "metric-bash-cost",
  title: "Bash Cost",
  nodeId: "bash-cost",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-block",
  includeInChildAggregates: true,
  createdAt: "2026-09-24T15:08:51.550Z",
  updatedAt: "2026-09-24T15:09:07.000Z",
} as const satisfies TemperMetricTree
