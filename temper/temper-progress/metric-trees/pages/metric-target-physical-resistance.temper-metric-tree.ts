import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPhysicalResistance = {
  id: "019e2fcd-5aa5-755f-bc1d-ba37edbc8e70",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-physical-resistance",
  title: "Target Physical Resistance",
  nodeId: "target-physical-resistance",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-target-resistance",
} as const satisfies TemperMetricTree
