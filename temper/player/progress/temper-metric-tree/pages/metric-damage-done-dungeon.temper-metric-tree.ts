import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneDungeon = {
  id: "019e2fcd-5970-7def-b04e-be7059b33f9c",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-dungeon",
  title: "Damage Done (Dungeon)",
  nodeId: "damage-done-dungeon",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-damage-done",
  createdAt: "2026-05-16T08:00:47.472Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
