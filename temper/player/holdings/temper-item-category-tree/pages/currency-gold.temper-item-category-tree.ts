import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const currencyGold = {
  id: "01a05fcf-f7d7-7ff9-a3f6-6ae7fec57580",
  type: "page-type/temper-item-category-tree",
  slug: "currency-gold",
  title: "Gold",
  parent: "temper-item-category-tree/currency",
  displayOrder: 0,
} as const satisfies TemperItemCategoryTree
