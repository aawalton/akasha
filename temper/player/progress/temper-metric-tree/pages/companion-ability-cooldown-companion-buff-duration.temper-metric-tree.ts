import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionAbilityCooldownCompanionBuffDuration = {
  id: "01a0df07-1cd5-7d5e-ac5c-3c29212e572a",
  type: "page-type/temper-metric-tree",
  slug: "companion-ability-cooldown-companion-buff-duration",
  title: "Buff Duration",
  nodeId: "companion-buff-duration",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-ability-cooldown",
} as const satisfies TemperMetricTree
