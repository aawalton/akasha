import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkRecipes = {
  id: "01a05fcf-f7dc-705c-b266-adb57508ea73",
  type: "page-type/temper-item-category-tree",
  slug: "drink-recipes",
  title: "Drink Recipes",
  parent: "temper-item-category-tree/recipes",
  displayOrder: 1,
  specializedItemTypes: [171],
} as const satisfies TemperItemCategoryTree
