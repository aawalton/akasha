import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalResistance = {
  id: "019e2fcd-5aa0-7341-8083-a2058fbf5748",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-resistance",
  title: "Target Critical Resistance",
  nodeId: "target-critical-resistance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
