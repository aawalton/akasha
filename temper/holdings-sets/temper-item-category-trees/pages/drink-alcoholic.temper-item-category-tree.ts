import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const drinkAlcoholic = {
  id: "01a05fcf-f7da-7192-9121-1730f71b74de",
  type: "temper-item-category-tree",
  slug: "drink-alcoholic",
  title: "Alcoholic",
  parent: "drink",
  displayOrder: 0,
  specializedItemTypes: [20],
} as const satisfies TemperItemCategoryTree
