import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkTea = {
  id: "01a05fcf-f7dc-7df5-afcf-53397efcbc9b",
  type: "page-type/temper-item-category-tree",
  slug: "drink-tea",
  title: "Tea",
  parent: "temper-item-category-tree/drink",
  displayOrder: 1,
  specializedItemTypes: [21],
} as const satisfies TemperItemCategoryTree
