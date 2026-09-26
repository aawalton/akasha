import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionEffectiveHealing = {
  id: "01a0df07-1cd5-790f-b2cd-eb2cdfd89a9d",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-effective-healing",
  title: "Healing",
  nodeId: "companion-effective-healing",
  nodeType: "companion-category",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-group-healing",
} as const satisfies TemperMetricTree
