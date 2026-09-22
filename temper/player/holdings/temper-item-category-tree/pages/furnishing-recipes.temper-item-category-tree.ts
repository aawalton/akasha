import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnishingRecipes = {
  id: "01a05fcf-f81d-72f1-9a9f-af4abd4d7af3",
  type: "page-type/temper-item-category-tree",
  slug: "furnishing-recipes",
  title: "Furnishing Recipes",
  parent: "temper-item-category-tree/recipes",
  displayOrder: 2,
  specializedItemTypes: [172, 173, 174, 175, 176, 177, 178],
} as const satisfies TemperItemCategoryTree
