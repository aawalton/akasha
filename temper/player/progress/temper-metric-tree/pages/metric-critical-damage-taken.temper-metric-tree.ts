import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricCriticalDamageTaken = {
  id: "019e2fcd-5a31-70c3-a6b5-e2de23221e43",
  type: "page-type/temper-metric-tree",
  slug: "metric-critical-damage-taken",
  title: "Critical Damage Taken",
  nodeId: "critical-damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-critical-defense",
} as const satisfies TemperMetricTree
