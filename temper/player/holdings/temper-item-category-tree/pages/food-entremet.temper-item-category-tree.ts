import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodEntremet = {
  id: "01a05fcf-f7e1-7719-9970-1bf603e2ced7",
  type: "page-type/temper-item-category-tree",
  slug: "food-entremet",
  title: "Entremet",
  parent: "temper-item-category-tree/food",
  displayOrder: 5,
  specializedItemTypes: [6],
  createdAt: "2026-09-02T01:51:00.065Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
