import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnFires = {
  id: "01a05fcf-f7f7-745a-8f9d-48e3e53b46a4",
  type: "page-type/temper-item-category-tree",
  slug: "furn-fires",
  title: "Fires",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 4,
  furnitureSubcategoryIds: [126],
} as const satisfies TemperItemCategoryTree
