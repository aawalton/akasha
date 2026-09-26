import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionTpsTotal = {
  id: "01a0df07-1cd5-75e6-a6cc-d23255511195",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-tps-total",
  title: "Toughness Per Second",
  nodeId: "companion-tps-total",
  nodeType: "companion-category",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-group-toughness",
} as const satisfies TemperMetricTree
