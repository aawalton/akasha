import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const foodEntremet = {
  id: "01a05fcf-f7e1-7719-9970-1bf603e2ced7",
  type: "temper-item-category-tree",
  slug: "food-entremet",
  title: "Entremet",
  parent: "food",
  displayOrder: 5,
  specializedItemTypes: [6],
} as const satisfies TemperItemCategoryTree
