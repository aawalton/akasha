import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveDamageCompanionTargetRemainingArmor = {
  id: "01a0df07-1cd6-7791-861e-4a848ed723fb",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-damage-companion-target-remaining-armor",
  title: "Target Remaining Armor",
  nodeId: "companion-target-remaining-armor",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/companion-category-companion-effective-damage",
} as const satisfies TemperMetricTree
