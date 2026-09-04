import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalDamageDone = {
  id: "019e2fcd-5a90-70dc-b810-60b7ad3d2179",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-damage-done",
  title: "Target Critical Damage Done",
  nodeId: "target-critical-damage-done",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
