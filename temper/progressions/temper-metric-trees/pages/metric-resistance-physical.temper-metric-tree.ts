import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricResistancePhysical = {
  id: "019e2fcd-5a22-7eca-b412-e966c5ab0a2b",
  type: "temper-metric-tree",
  slug: "metric-resistance-physical",
  title: "Resistance Physical",
  nodeId: "resistance-physical",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-resistance",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
