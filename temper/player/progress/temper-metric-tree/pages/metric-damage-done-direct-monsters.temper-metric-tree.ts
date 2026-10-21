import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneDirectMonsters = {
  id: "01a15f66-1652-7fb4-ad1c-7efa6298de52",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-direct-monsters",
  title: "Damage Done (Direct, Monsters)",
  nodeId: "damage-done-direct-monsters",
  nodeType: "metric",
  displayOrder: 12,
  parent: "temper-metric-tree/subcategory-damage-done",
  createdAt: "2026-10-21T16:58:08.337Z",
  updatedAt: "2026-10-21T16:58:08.337Z",
} as const satisfies TemperMetricTree
