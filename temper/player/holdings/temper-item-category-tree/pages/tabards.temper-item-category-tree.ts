import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const tabards = {
  id: "01a05fcf-f843-76c7-9753-908fcecd0e06",
  type: "page-type/temper-item-category-tree",
  slug: "tabards",
  title: "Tabards",
  parent: "temper-item-category-tree/appearance",
  displayOrder: 2,
  itemTypes: [15],
  createdAt: "2026-09-02T01:51:00.163Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
