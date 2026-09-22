import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnLibrary = {
  id: "01a05fcf-f7ff-7e38-8e83-e4e1500305c0",
  type: "page-type/temper-item-category-tree",
  slug: "furn-library",
  title: "Library",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 2,
  furnitureCategoryIds: [3],
} as const satisfies TemperItemCategoryTree
