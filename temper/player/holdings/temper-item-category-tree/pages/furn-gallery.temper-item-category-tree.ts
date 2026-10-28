import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGallery = {
  id: "01a05fcf-f7f8-736c-a286-117346e23fb9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-gallery",
  title: "Gallery",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 7,
  furnitureCategoryIds: [9],
  createdAt: "2026-09-02T01:51:00.088Z",
  updatedAt: "2026-10-28T19:29:15.609Z",
} as const satisfies TemperItemCategoryTree
