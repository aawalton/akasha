import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkAlcoholic = {
  id: "01a05fcf-f7da-7192-9121-1730f71b74de",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-alcoholic",
  title: "Alcoholic",
  parent: "drink",
  displayOrder: 0,
  specializedItemTypes: [20],
} as const satisfies TemperItemCategoryTree
