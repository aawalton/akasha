import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenArena = {
  id: "019e2fcd-5a35-7bc1-b144-d241c99e3cb5",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-arena",
  title: "Damage Taken Arena",
  nodeId: "damage-taken-arena",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-damage-taken",
} as const satisfies TemperMetricTree
