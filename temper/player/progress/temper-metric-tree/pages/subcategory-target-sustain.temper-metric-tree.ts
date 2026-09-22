import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryTargetSustain = {
  id: "019e2fcd-5a98-7be8-827e-c6a4f092b010",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-target-sustain",
  title: "Sustain",
  nodeId: "target-sustain",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "temper-metric-tree/category-target",
} as const satisfies TemperMetricTree
