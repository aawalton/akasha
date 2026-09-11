import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const drinkCordialTea = {
  id: "01a05fcf-f7da-7e83-89cb-402b5512cd2a",
  type: "temper-item-category-tree",
  slug: "drink-cordial-tea",
  title: "Cordial Tea",
  parent: "drink",
  displayOrder: 5,
  specializedItemTypes: [25],
} as const satisfies TemperItemCategoryTree
