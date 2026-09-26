import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionEffectiveDamage = {
  id: "01a0df07-1cd5-7d22-a9cf-f09181c4da42",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-effective-damage",
  title: "Effective Power",
  nodeId: "companion-effective-damage",
  nodeType: "companion-category",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-group-damage",
} as const satisfies TemperMetricTree
