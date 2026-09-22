import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGallery = {
  id: "01a05fcf-f7f8-736c-a286-117346e23fb9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-gallery",
  title: "Gallery",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 7,
  furnitureCategoryIds: [8],
} as const satisfies TemperItemCategoryTree
