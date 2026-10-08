import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodIngredients = {
  id: "01a05fcf-f7e2-7c27-8064-8d7801a54bc8",
  type: "page-type/temper-item-category-tree",
  slug: "food-ingredients",
  title: "Food Ingredients",
  parent: "temper-item-category-tree/ingredients",
  displayOrder: 0,
  specializedItemTypes: [42, 40, 41],
  createdAt: "2026-09-02T01:51:00.066Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
