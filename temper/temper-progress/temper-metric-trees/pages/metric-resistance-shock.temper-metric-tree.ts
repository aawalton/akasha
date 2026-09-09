import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceShock = {
  id: "019e2fcd-5a2e-7c18-8bcc-4a4254af9d58",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-shock",
  title: "Resistance Shock",
  nodeId: "resistance-shock",
  nodeType: "metric",
  displayOrder: 5,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
