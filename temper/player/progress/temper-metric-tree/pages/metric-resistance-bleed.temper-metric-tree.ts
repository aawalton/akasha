import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceBleed = {
  id: "019e2fcd-5a24-71d5-b658-29d4b2ed8031",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-bleed",
  title: "Resistance Bleed",
  nodeId: "resistance-bleed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-resistance-physical",
} as const satisfies TemperMetricTree
