import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneArena = {
  id: "019e2fcd-596b-7f1f-b0bb-3355eaffe9f5",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-arena",
  title: "Damage Done Arena",
  nodeId: "damage-done-arena",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
