import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveToughnessCompanionArmor = {
  id: "01a0df07-1cd6-72cc-9ab6-e760942c1482",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-toughness-companion-armor",
  title: "Armor",
  nodeId: "companion-armor",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-effective-toughness",
} as const satisfies TemperMetricTree
