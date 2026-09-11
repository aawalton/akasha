import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricTargetPhysicalResistance = {
  id: "019e2fcd-5aa5-755f-bc1d-ba37edbc8e70",
  type: "temper-metric-tree",
  slug: "metric-target-physical-resistance",
  title: "Target Physical Resistance",
  nodeId: "target-physical-resistance",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-target-resistance",
} as const satisfies TemperMetricTree
