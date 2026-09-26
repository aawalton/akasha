import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionAbilityCooldownCompanionRollDodgeCooldown = {
  id: "01a0df07-1cd5-7816-af10-98d1ba0c61d4",
  type: "page-type/temper-metric-tree",
  slug: "companion-ability-cooldown-companion-roll-dodge-cooldown",
  title: "Roll Dodge CD",
  nodeId: "companion-roll-dodge-cooldown",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/companion-category-companion-ability-cooldown",
} as const satisfies TemperMetricTree
