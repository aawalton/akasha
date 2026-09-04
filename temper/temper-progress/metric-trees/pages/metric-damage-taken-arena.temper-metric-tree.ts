import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenArena = {
  id: "019e2fcd-5a35-7bc1-b144-d241c99e3cb5",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-arena",
  title: "Damage Taken Arena",
  nodeId: "damage-taken-arena",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
