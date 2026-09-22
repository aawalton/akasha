import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistancePoison = {
  id: "019e2fcd-5a26-78bc-b4fd-845eb09f7e43",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-poison",
  title: "Resistance Poison",
  nodeId: "resistance-poison",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/metric-resistance-physical",
} as const satisfies TemperMetricTree
