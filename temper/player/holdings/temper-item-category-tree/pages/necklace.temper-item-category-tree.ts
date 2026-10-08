import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const necklace = {
  id: "01a05fcf-f82f-7d5a-962c-39b9d696f1dd",
  type: "page-type/temper-item-category-tree",
  slug: "necklace",
  title: "Necklace",
  parent: "temper-item-category-tree/jewelry",
  displayOrder: 0,
  equipTypes: [2],
  createdAt: "2026-09-02T01:51:00.143Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
