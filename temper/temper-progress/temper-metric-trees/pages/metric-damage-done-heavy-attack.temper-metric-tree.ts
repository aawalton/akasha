import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneHeavyAttack = {
  id: "019e2fcd-5971-7f4c-a459-69d9daf6b4f8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-heavy-attack",
  title: "Damage Done Heavy Attack",
  nodeId: "damage-done-heavy-attack",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
