import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGame = {
  id: "01a05fcf-f7f8-70ca-b2cd-8dfc27477041",
  type: "page-type/temper-item-category-tree",
  slug: "furn-game",
  title: "Game",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 6,
  furnitureSubcategoryIds: [85],
  createdAt: "2026-09-02T01:51:00.088Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
