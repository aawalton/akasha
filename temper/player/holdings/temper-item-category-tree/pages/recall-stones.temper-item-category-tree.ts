import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recallStones = {
  id: "01a05fcf-f835-7bb7-a4ef-79079c1be08b",
  type: "page-type/temper-item-category-tree",
  slug: "recall-stones",
  title: "Recall Stones",
  parent: "temper-item-category-tree/alliance-war",
  displayOrder: 2,
  itemTypes: [69],
} as const satisfies TemperItemCategoryTree
