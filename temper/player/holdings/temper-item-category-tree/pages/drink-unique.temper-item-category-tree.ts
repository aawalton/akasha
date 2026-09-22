import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkUnique = {
  id: "01a05fcf-f7dd-7c10-a7f2-a2a451e7d130",
  type: "page-type/temper-item-category-tree",
  slug: "drink-unique",
  title: "Unique",
  parent: "temper-item-category-tree/drink",
  displayOrder: 7,
  specializedItemTypes: [27],
} as const satisfies TemperItemCategoryTree
