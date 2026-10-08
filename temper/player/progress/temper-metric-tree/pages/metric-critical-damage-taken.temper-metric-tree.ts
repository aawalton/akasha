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
  createdAt: "2026-05-16T08:00:47.665Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
