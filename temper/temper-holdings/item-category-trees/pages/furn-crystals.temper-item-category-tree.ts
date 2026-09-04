import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCrystals = {
  id: "01a05fcf-f7ef-7475-833a-b2b72e81cf91",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-crystals",
  title: "Crystals",
  parent: "furn-conservatory",
  displayOrder: 2,
  furnitureSubcategoryIds: [160],
} as const satisfies TemperItemCategoryTree
