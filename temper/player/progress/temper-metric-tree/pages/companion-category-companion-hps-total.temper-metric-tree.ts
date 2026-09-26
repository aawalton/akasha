import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionHpsTotal = {
  id: "01a0df07-1cd5-7a03-9875-97dd56f465e5",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-hps-total",
  title: "Healing Per Second",
  nodeId: "companion-hps-total",
  nodeType: "companion-category",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-group-healing",
} as const satisfies TemperMetricTree
