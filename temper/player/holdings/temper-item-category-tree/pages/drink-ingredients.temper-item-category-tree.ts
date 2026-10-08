import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkIngredients = {
  id: "01a05fcf-f7db-7348-a117-a7268dbd0d5f",
  type: "page-type/temper-item-category-tree",
  slug: "drink-ingredients",
  title: "Drink Ingredients",
  parent: "temper-item-category-tree/ingredients",
  displayOrder: 1,
  specializedItemTypes: [44, 45, 46],
  createdAt: "2026-09-02T01:51:00.059Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
