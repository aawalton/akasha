import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionSupportScore = {
  id: "01a0df07-1cd5-77e8-879a-5cc970200f39",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-support-score",
  title: "Support Score",
  nodeId: "companion-support-score",
  nodeType: "companion-category",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-group-utility",
} as const satisfies TemperMetricTree
