import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkRecipes = {
  id: "01a05fcf-f7dc-705c-b266-adb57508ea73",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-recipes",
  title: "Drink Recipes",
  parent: "recipes",
  displayOrder: 1,
  specializedItemTypes: [171],
} as const satisfies TemperItemCategoryTree
