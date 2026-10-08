import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTaken = {
  id: "019e2fcd-5a34-795b-b1cb-c76ba3452c39",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-taken",
  createdAt: "2026-05-16T08:00:47.668Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
