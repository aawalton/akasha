import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnGame = {
  id: "01a05fcf-f7f8-70ca-b2cd-8dfc27477041",
  type: "temper-item-category-tree",
  slug: "furn-game",
  title: "Game",
  parent: "furn-hearth",
  displayOrder: 6,
  furnitureSubcategoryIds: [85],
} as const satisfies TemperItemCategoryTree
