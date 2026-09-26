import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionDpsTotal = {
  id: "01a0df07-1cd5-7a2c-9f41-e41d0bfe3715",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-dps-total",
  title: "Damage Per Second",
  nodeId: "companion-dps-total",
  nodeType: "companion-category",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-group-damage",
} as const satisfies TemperMetricTree
