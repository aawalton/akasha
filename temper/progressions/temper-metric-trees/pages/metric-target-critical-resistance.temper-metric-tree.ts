import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricTargetCriticalResistance = {
  id: "019e2fcd-5aa0-7341-8083-a2058fbf5748",
  type: "temper-metric-tree",
  slug: "metric-target-critical-resistance",
  title: "Target Critical Resistance",
  nodeId: "target-critical-resistance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
