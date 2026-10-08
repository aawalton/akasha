import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenDirect = {
  id: "019e2fcd-5a36-7e51-81d7-8d338a3be735",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-direct",
  title: "Direct Damage Taken",
  nodeId: "damage-taken-direct",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-damage-taken",
  createdAt: "2026-05-16T08:00:47.670Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
