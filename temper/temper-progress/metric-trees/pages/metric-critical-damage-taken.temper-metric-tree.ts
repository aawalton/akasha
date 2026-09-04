import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamageTaken = {
  id: "019e2fcd-5a31-70c3-a6b5-e2de23221e43",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage-taken",
  title: "Critical Damage Taken",
  nodeId: "critical-damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-critical-defense",
} as const satisfies TemperMetricTree
