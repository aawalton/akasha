import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const rareIngredients = {
  id: "01a05fcf-f833-71c8-8faa-8635fe523267",
  pageTypeSlug: "temper-item-category-tree",
  slug: "rare-ingredients",
  title: "Rare Ingredients",
  parent: "ingredients",
  displayOrder: 3,
  specializedItemTypes: [48],
} as const satisfies TemperItemCategoryTree
