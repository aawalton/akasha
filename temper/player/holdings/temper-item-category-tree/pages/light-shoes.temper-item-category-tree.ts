import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightShoes = {
  id: "01a05fcf-f828-7cdc-bce9-58655524f23d",
  type: "page-type/temper-item-category-tree",
  slug: "light-shoes",
  title: "Shoes",
  parent: "temper-item-category-tree/light-armor",
  displayOrder: 6,
  equipTypes: [10],
  createdAt: "2026-09-02T01:51:00.136Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
