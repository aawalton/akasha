import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnishingRecipes = {
  id: "01a05fcf-f81d-72f1-9a9f-af4abd4d7af3",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furnishing-recipes",
  title: "Furnishing Recipes",
  parent: "recipes",
  displayOrder: 2,
  specializedItemTypes: [172, 173, 174, 175, 176, 177, 178],
} as const satisfies TemperItemCategoryTree
