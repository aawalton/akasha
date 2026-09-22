import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkAlcoholic = {
  id: "01a05fcf-f7da-7192-9121-1730f71b74de",
  type: "page-type/temper-item-category-tree",
  slug: "drink-alcoholic",
  title: "Alcoholic",
  parent: "temper-item-category-tree/drink",
  displayOrder: 0,
  specializedItemTypes: [20],
} as const satisfies TemperItemCategoryTree
