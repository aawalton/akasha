import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnChairs = {
  id: "01a05fcf-f7ed-785f-9bb9-0dbf4bea5420",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-chairs",
  title: "Chairs",
  parent: "furn-dining",
  displayOrder: 1,
  furnitureSubcategoryIds: [131],
} as const satisfies TemperItemCategoryTree
