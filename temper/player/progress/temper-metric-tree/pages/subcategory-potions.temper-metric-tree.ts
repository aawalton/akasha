import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryPotions = {
  id: "019e2fcd-5ab4-7d87-aaa6-32ee8b6ca14d",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-potions",
  title: "Potions",
  nodeId: "potions",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "temper-metric-tree/category-other",
} as const satisfies TemperMetricTree
