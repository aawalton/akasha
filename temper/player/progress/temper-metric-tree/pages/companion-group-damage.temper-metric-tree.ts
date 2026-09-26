import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionGroupDamage = {
  id: "01a0df07-1cd6-7656-a322-905ef7ef86b9",
  type: "page-type/temper-metric-tree",
  slug: "companion-group-damage",
  title: "Damage",
  nodeId: "damage",
  nodeType: "companion-group",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-stats",
} as const satisfies TemperMetricTree
