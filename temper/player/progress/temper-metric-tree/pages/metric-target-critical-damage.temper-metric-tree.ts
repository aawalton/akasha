import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetCriticalDamage = {
  id: "019e2fcd-5a8e-7d22-a444-c6aba84eaab2",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-critical-damage",
  title: "Target Critical Damage",
  nodeId: "target-critical-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-target-damage",
  createdAt: "2026-05-16T08:00:47.758Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
