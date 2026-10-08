import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodRecipes = {
  id: "01a05fcf-f7e3-7e1d-a1a3-0e130fba9209",
  type: "page-type/temper-item-category-tree",
  slug: "food-recipes",
  title: "Food Recipes",
  parent: "temper-item-category-tree/recipes",
  displayOrder: 0,
  specializedItemTypes: [170],
  createdAt: "2026-09-02T01:51:00.067Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
