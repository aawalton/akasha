import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const drinkRecipes = {
  id: "01a05fcf-f7dc-705c-b266-adb57508ea73",
  type: "temper-item-category-tree",
  slug: "drink-recipes",
  title: "Drink Recipes",
  parent: "recipes",
  displayOrder: 1,
  specializedItemTypes: [171],
} as const satisfies TemperItemCategoryTree
