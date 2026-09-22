import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCrystals = {
  id: "01a05fcf-f7ef-7475-833a-b2b72e81cf91",
  type: "page-type/temper-item-category-tree",
  slug: "furn-crystals",
  title: "Crystals",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 2,
  furnitureSubcategoryIds: [160],
} as const satisfies TemperItemCategoryTree
