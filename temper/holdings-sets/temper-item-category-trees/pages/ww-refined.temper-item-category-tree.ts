import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const wwRefined = {
  id: "01a05fcf-f84a-7c45-9cd7-5dfaf4b23a42",
  type: "temper-item-category-tree",
  slug: "ww-refined",
  title: "Refined Materials",
  parent: "woodworking",
  displayOrder: 2,
  itemTypes: [38],
} as const satisfies TemperItemCategoryTree
