import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetCriticalResistance = {
  id: "019e2fcd-5aa0-7341-8083-a2058fbf5748",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-critical-resistance",
  title: "Target Critical Resistance",
  nodeId: "target-critical-resistance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-target-toughness",
} as const satisfies TemperMetricTree
