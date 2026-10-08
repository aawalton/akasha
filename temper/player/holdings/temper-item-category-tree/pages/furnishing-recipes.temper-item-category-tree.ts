import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnishingRecipes = {
  id: "01a05fcf-f81d-72f1-9a9f-af4abd4d7af3",
  type: "page-type/temper-item-category-tree",
  slug: "furnishing-recipes",
  title: "Furnishing Recipes",
  parent: "temper-item-category-tree/recipes",
  displayOrder: 2,
  specializedItemTypes: [172, 173, 174, 175, 176, 177, 178],
  createdAt: "2026-09-02T01:51:00.125Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
