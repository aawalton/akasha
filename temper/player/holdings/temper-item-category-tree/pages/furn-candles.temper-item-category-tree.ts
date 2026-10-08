import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCandles = {
  id: "01a05fcf-f7ec-7cd3-b3eb-0c6b176bca0f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-candles",
  title: "Candles",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 1,
  furnitureSubcategoryIds: [128],
  createdAt: "2026-09-02T01:51:00.076Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
