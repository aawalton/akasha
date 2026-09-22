import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnLighting = {
  id: "01a05fcf-f7ff-7511-a615-f51c8c9ebf5b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-lighting",
  title: "Lighting",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 9,
  furnitureCategoryIds: [10],
} as const satisfies TemperItemCategoryTree
