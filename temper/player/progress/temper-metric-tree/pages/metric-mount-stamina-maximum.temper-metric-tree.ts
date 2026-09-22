import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMountStaminaMaximum = {
  id: "019e2fcd-5a81-71e7-8248-6feeaa06f5eb",
  type: "page-type/temper-metric-tree",
  slug: "metric-mount-stamina-maximum",
  title: "Mount Stamina Maximum",
  nodeId: "mount-stamina-maximum",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/category-mobility",
} as const satisfies TemperMetricTree
