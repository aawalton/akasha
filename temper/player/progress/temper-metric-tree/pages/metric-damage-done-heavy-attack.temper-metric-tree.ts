import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneHeavyAttack = {
  id: "019e2fcd-5971-7f4c-a459-69d9daf6b4f8",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-heavy-attack",
  title: "Damage Done Heavy Attack",
  nodeId: "damage-done-heavy-attack",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
