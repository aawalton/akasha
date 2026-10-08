import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkLiqueur = {
  id: "01a05fcf-f7db-726b-9a42-c17ace1e8208",
  type: "page-type/temper-item-category-tree",
  slug: "drink-liqueur",
  title: "Liqueur",
  parent: "temper-item-category-tree/drink",
  displayOrder: 3,
  specializedItemTypes: [23],
  createdAt: "2026-09-02T01:51:00.059Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
