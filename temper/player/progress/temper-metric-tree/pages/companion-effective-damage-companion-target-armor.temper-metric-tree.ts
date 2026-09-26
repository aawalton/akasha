import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveDamageCompanionTargetArmor = {
  id: "01a0df07-1cd6-7041-a6ff-64894eff4989",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-damage-companion-target-armor",
  title: "Target Armor",
  nodeId: "companion-target-armor",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/companion-category-companion-effective-damage",
} as const satisfies TemperMetricTree
