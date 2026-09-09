import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamage = {
  id: "019e2fcd-5979-703e-9e83-902a746430e4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage",
  title: "Critical Damage",
  nodeId: "critical-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-critical-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
