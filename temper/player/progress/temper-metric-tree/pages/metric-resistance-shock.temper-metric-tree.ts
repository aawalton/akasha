import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceShock = {
  id: "019e2fcd-5a2e-7c18-8bcc-4a4254af9d58",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-shock",
  title: "Resistance Shock",
  nodeId: "resistance-shock",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/metric-resistance-spell",
} as const satisfies TemperMetricTree
