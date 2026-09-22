import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryTargetToughness = {
  id: "019e2fcd-5a9d-7b60-b430-86f20bda3851",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-target-toughness",
  title: "Toughness",
  nodeId: "target-toughness",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "temper-metric-tree/category-target",
} as const satisfies TemperMetricTree
