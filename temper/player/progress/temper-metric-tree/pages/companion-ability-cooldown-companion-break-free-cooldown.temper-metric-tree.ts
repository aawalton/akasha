import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionAbilityCooldownCompanionBreakFreeCooldown = {
  id: "01a0df07-1cd5-74c5-b930-8d0f01706161",
  type: "page-type/temper-metric-tree",
  slug: "companion-ability-cooldown-companion-break-free-cooldown",
  title: "Break Free CD",
  nodeId: "companion-break-free-cooldown",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-category-companion-ability-cooldown",
} as const satisfies TemperMetricTree
