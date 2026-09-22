import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDining = {
  id: "01a05fcf-f7f1-7d99-a94d-64a21c7ab953",
  type: "page-type/temper-item-category-tree",
  slug: "furn-dining",
  title: "Dining",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 3,
  furnitureCategoryIds: [4],
} as const satisfies TemperItemCategoryTree
