import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetResistance = {
  id: "019e2fcd-5aa4-70d1-a9a7-c4b802a29b5c",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-resistance",
  title: "Target Resistance",
  nodeId: "target-resistance",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-target-toughness",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.780Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
