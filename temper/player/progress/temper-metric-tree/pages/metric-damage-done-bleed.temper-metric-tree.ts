import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneBleed = {
  id: "019e2fcd-5983-7f80-8793-3f39811d1258",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-bleed",
  title: "Damage Done Bleed",
  nodeId: "damage-done-bleed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
