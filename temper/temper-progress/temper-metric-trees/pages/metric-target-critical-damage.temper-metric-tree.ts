import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalDamage = {
  id: "019e2fcd-5a8e-7d22-a444-c6aba84eaab2",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-damage",
  title: "Target Critical Damage",
  nodeId: "target-critical-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
