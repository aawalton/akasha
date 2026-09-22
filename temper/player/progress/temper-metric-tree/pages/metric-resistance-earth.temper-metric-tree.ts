import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceEarth = {
  id: "019e2fcd-5a28-7d4f-9c43-18c610fad28c",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-earth",
  title: "Resistance Earth",
  nodeId: "resistance-earth",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-resistance-spell",
} as const satisfies TemperMetricTree
