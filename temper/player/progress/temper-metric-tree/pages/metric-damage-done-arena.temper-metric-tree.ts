import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneArena = {
  id: "019e2fcd-596b-7f1f-b0bb-3355eaffe9f5",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-arena",
  title: "Damage Done Arena",
  nodeId: "damage-done-arena",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
