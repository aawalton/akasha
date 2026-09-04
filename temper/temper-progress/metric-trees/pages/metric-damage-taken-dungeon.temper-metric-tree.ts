import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenDungeon = {
  id: "019e2fcd-5a38-70b6-8fcb-31686b925880",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-dungeon",
  title: "Damage Taken Dungeon",
  nodeId: "damage-taken-dungeon",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
