import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneDungeon = {
  id: "019e2fcd-5970-7def-b04e-be7059b33f9c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-dungeon",
  title: "Damage Done Dungeon",
  nodeId: "damage-done-dungeon",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
