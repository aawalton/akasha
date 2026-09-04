import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkUnique = {
  id: "01a05fcf-f7dd-7c10-a7f2-a2a451e7d130",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-unique",
  title: "Unique",
  parent: "drink",
  displayOrder: 7,
  specializedItemTypes: [27],
} as const satisfies TemperItemCategoryTree
