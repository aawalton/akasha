import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnCrystals = {
  id: "01a05fcf-f7ef-7475-833a-b2b72e81cf91",
  type: "temper-item-category-tree",
  slug: "furn-crystals",
  title: "Crystals",
  parent: "furn-conservatory",
  displayOrder: 2,
  furnitureSubcategoryIds: [160],
} as const satisfies TemperItemCategoryTree
