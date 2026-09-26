import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionDamageBlocked = {
  id: "01a0df07-1cd5-7294-b12a-fb84e9941b0a",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-damage-blocked",
  title: "Damage Blocked",
  nodeId: "companion-damage-blocked",
  nodeType: "companion-category",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-group-toughness",
} as const satisfies TemperMetricTree
