import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnFires = {
  id: "01a05fcf-f7f7-745a-8f9d-48e3e53b46a4",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-fires",
  title: "Fires",
  parent: "furn-lighting",
  displayOrder: 4,
  furnitureSubcategoryIds: [126],
} as const satisfies TemperItemCategoryTree
