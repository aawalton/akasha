import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnChairs = {
  id: "01a05fcf-f7ed-785f-9bb9-0dbf4bea5420",
  type: "page-type/temper-item-category-tree",
  slug: "furn-chairs",
  title: "Chairs",
  parent: "temper-item-category-tree/furn-dining",
  displayOrder: 1,
  furnitureSubcategoryIds: [131],
} as const satisfies TemperItemCategoryTree
