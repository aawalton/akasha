import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenFall = {
  id: "019e2fcd-5a3d-7e26-8a90-398885893588",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-fall",
  title: "Damage Taken (Fall)",
  nodeId: "damage-taken-fall",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-damage-taken-by-type",
  createdAt: "2026-05-16T08:00:47.677Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
