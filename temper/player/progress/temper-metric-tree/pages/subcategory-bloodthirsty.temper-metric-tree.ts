import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryBloodthirsty = {
  id: "019e2fcd-59ea-7ba4-9de3-3ed3b9b2615a",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-bloodthirsty",
  title: "Bloodthirsty",
  nodeId: "bloodthirsty",
  nodeType: "subcategory",
  displayOrder: 12,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
