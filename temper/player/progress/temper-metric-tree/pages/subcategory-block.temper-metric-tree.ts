import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryBlock = {
  id: "019e2fcd-5a82-7549-8c76-ed896a162fea",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-block",
  title: "Block",
  nodeId: "block",
  nodeType: "subcategory",
  displayOrder: 5,
  parent: "temper-metric-tree/category-mobility",
} as const satisfies TemperMetricTree
