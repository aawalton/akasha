import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageShield = {
  id: "019e2fcd-5a4c-7695-858e-0d684f7c8565",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-shield",
  title: "Damage Shield",
  nodeId: "damage-shield",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-shields",
  createdAt: "2026-05-16T08:00:47.692Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
