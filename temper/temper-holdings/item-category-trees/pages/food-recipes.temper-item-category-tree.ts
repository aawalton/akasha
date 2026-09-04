import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodRecipes = {
  id: "01a05fcf-f7e3-7e1d-a1a3-0e130fba9209",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-recipes",
  title: "Food Recipes",
  parent: "recipes",
  displayOrder: 0,
  specializedItemTypes: [170],
} as const satisfies TemperItemCategoryTree
