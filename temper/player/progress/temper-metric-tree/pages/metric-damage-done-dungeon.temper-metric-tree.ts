import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneDungeon = {
  id: "019e2fcd-5970-7def-b04e-be7059b33f9c",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-dungeon",
  title: "Damage Done Dungeon",
  nodeId: "damage-done-dungeon",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
