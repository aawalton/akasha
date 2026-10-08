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
  createdAt: "2026-09-26T18:43:00.438Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetricTree
