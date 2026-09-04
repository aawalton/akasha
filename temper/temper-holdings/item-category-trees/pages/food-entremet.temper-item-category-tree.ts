import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodEntremet = {
  id: "01a05fcf-f7e1-7719-9970-1bf603e2ced7",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-entremet",
  title: "Entremet",
  parent: "food",
  displayOrder: 5,
  specializedItemTypes: [6],
} as const satisfies TemperItemCategoryTree
