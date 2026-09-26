import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionCategoryCompanionScore = {
  id: "01a0df21-8c4e-731e-bd76-96d9b6a61e19",
  type: "page-type/temper-metric-tree",
  slug: "companion-category-companion-score",
  title: "Score",
  nodeId: "companion-score",
  nodeType: "companion-category",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-role-group-overall",
} as const satisfies TemperMetricTree
