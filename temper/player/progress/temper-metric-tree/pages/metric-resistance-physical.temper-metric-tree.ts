import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistancePhysical = {
  id: "019e2fcd-5a22-7eca-b412-e966c5ab0a2b",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-physical",
  title: "Resistance Physical",
  nodeId: "resistance-physical",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-resistance",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
