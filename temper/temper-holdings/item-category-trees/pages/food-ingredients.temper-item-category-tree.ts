import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodIngredients = {
  id: "01a05fcf-f7e2-7c27-8064-8d7801a54bc8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-ingredients",
  title: "Food Ingredients",
  parent: "ingredients",
  displayOrder: 0,
  specializedItemTypes: [42, 40, 41],
} as const satisfies TemperItemCategoryTree
