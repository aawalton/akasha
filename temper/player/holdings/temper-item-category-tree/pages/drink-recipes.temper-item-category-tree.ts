import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkRecipes = {
  id: "01a05fcf-f7dc-705c-b266-adb57508ea73",
  type: "page-type/temper-item-category-tree",
  slug: "drink-recipes",
  title: "Drink Recipes",
  parent: "temper-item-category-tree/recipes",
  displayOrder: 1,
  specializedItemTypes: [171],
  createdAt: "2026-09-02T01:51:00.060Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
