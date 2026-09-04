import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceFlame = {
  id: "019e2fcd-5a29-7fa5-8080-2db86878536a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-flame",
  title: "Resistance Flame",
  nodeId: "resistance-flame",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
