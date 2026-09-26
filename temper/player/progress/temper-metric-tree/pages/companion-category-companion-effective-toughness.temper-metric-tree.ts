import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionEffectiveToughness = {
  id: "01a0df07-1cd5-7963-8966-a5e9d30f00a1",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-effective-toughness",
  title: "Effective Health",
  nodeId: "companion-effective-toughness",
  nodeType: "companion-category",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-group-toughness",
} as const satisfies TemperMetricTree
