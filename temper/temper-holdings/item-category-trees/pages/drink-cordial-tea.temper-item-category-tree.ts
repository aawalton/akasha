import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkCordialTea = {
  id: "01a05fcf-f7da-7e83-89cb-402b5512cd2a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-cordial-tea",
  title: "Cordial Tea",
  parent: "drink",
  displayOrder: 5,
  specializedItemTypes: [25],
} as const satisfies TemperItemCategoryTree
