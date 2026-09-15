import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkLiqueur = {
  id: "01a05fcf-f7db-726b-9a42-c17ace1e8208",
  type: "page-type/temper-item-category-tree",
  slug: "drink-liqueur",
  title: "Liqueur",
  parent: "drink",
  displayOrder: 3,
  specializedItemTypes: [23],
} as const satisfies TemperItemCategoryTree
