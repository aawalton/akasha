import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceMagic = {
  id: "019e2fcd-5a2c-75d8-8f96-e73db7741182",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-magic",
  title: "Resistance Magic",
  nodeId: "resistance-magic",
  nodeType: "metric",
  displayOrder: 3,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
