import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionSpsTotal = {
  id: "01a0df07-1cd5-71b7-9f59-e9cf9483dd2e",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-sps-total",
  title: "Shielding Per Second",
  nodeId: "companion-sps-total",
  nodeType: "companion-category",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-group-healing",
} as const satisfies TemperMetricTree
