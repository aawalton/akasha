import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionAbilityCooldownCompanionUltimateGeneration = {
  id: "01a0df07-1cd5-7d5e-b7e3-e70d7fb7201f",
  type: "page-type/temper-metric-tree",
  slug: "companion-ability-cooldown-companion-ultimate-generation",
  title: "Ultimate Generation",
  nodeId: "companion-ultimate-generation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-ability-cooldown",
} as const satisfies TemperMetricTree
