import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceOblivion = {
  id: "019e2fcd-5a2d-79e1-a2b1-73db34330163",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-oblivion",
  title: "Resistance Oblivion",
  nodeId: "resistance-oblivion",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/metric-resistance-spell",
} as const satisfies TemperMetricTree
