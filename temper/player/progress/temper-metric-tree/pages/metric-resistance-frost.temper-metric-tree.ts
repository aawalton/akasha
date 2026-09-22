import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceFrost = {
  id: "019e2fcd-5a2b-735c-8b08-782fdcab955d",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-frost",
  title: "Resistance Frost",
  nodeId: "resistance-frost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/metric-resistance-spell",
} as const satisfies TemperMetricTree
