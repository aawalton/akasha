import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenDungeon = {
  id: "019e2fcd-5a38-70b6-8fcb-31686b925880",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-dungeon",
  title: "Damage Taken Dungeon",
  nodeId: "damage-taken-dungeon",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-damage-taken",
} as const satisfies TemperMetricTree
