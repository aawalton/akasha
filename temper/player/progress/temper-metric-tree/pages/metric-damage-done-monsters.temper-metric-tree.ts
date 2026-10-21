import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneMonsters = {
  id: "01a15f77-087b-7261-a832-c50fc42f8cb1",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-monsters",
  title: "Damage Done (Monsters)",
  nodeId: "damage-done-monsters",
  nodeType: "metric",
  displayOrder: 13,
  parent: "temper-metric-tree/subcategory-damage-done",
  createdAt: "2026-10-21T17:16:38.906Z",
  updatedAt: "2026-10-21T17:16:38.906Z",
} as const satisfies TemperMetricTree
