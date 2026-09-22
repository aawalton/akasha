import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetCriticalDamageDone = {
  id: "019e2fcd-5a90-70dc-b810-60b7ad3d2179",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-critical-damage-done",
  title: "Target Critical Damage Done",
  nodeId: "target-critical-damage-done",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-target-damage",
} as const satisfies TemperMetricTree
