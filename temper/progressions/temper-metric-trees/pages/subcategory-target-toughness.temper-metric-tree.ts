import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryTargetToughness = {
  id: "019e2fcd-5a9d-7b60-b430-86f20bda3851",
  type: "temper-metric-tree",
  slug: "subcategory-target-toughness",
  title: "Toughness",
  nodeId: "target-toughness",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "category-target",
} as const satisfies TemperMetricTree
