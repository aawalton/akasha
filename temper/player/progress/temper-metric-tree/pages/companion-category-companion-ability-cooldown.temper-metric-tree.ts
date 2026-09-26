import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionAbilityCooldown = {
  id: "01a0df07-1cd5-7390-bd62-fb9898d0b3ee",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-ability-cooldown",
  title: "Cooldown",
  nodeId: "companion-ability-cooldown",
  nodeType: "companion-category",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-group-utility",
} as const satisfies TemperMetricTree
