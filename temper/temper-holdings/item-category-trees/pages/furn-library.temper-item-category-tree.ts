import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnLibrary = {
  id: "01a05fcf-f7ff-7e38-8e83-e4e1500305c0",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-library",
  title: "Library",
  parent: "furnishings",
  displayOrder: 2,
  furnitureCategoryIds: [3],
} as const satisfies TemperItemCategoryTree
