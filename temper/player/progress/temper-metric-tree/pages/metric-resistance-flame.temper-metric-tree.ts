import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceFlame = {
  id: "019e2fcd-5a29-7fa5-8080-2db86878536a",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-flame",
  title: "Resistance Flame",
  nodeId: "resistance-flame",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-resistance-spell",
} as const satisfies TemperMetricTree
