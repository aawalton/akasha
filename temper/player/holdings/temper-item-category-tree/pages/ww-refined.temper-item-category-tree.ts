import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const wwRefined = {
  id: "01a05fcf-f84a-7c45-9cd7-5dfaf4b23a42",
  type: "page-type/temper-item-category-tree",
  slug: "ww-refined",
  title: "Refined Materials",
  parent: "temper-item-category-tree/woodworking",
  displayOrder: 2,
  itemTypes: [38],
} as const satisfies TemperItemCategoryTree
