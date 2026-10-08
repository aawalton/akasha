import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkCordialTea = {
  id: "01a05fcf-f7da-7e83-89cb-402b5512cd2a",
  type: "page-type/temper-item-category-tree",
  slug: "drink-cordial-tea",
  title: "Cordial Tea",
  parent: "temper-item-category-tree/drink",
  displayOrder: 5,
  specializedItemTypes: [25],
  createdAt: "2026-09-02T01:51:00.058Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
