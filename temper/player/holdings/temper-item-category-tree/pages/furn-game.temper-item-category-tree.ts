import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGame = {
  id: "01a05fcf-f7f8-70ca-b2cd-8dfc27477041",
  type: "page-type/temper-item-category-tree",
  slug: "furn-game",
  title: "Game",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 6,
  furnitureSubcategoryIds: [85],
} as const satisfies TemperItemCategoryTree
