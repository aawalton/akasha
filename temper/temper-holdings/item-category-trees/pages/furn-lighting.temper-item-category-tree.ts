import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnLighting = {
  id: "01a05fcf-f7ff-7511-a615-f51c8c9ebf5b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-lighting",
  title: "Lighting",
  parent: "furnishings",
  displayOrder: 9,
  furnitureCategoryIds: [10],
} as const satisfies TemperItemCategoryTree
