import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const treasure = {
  id: "01a05fcf-f845-73f5-8c6c-07272ff8481c",
  type: "page-type/temper-item-category-tree",
  slug: "treasure",
  title: "Treasure",
  parent: "temper-item-category-tree/treasures",
  displayOrder: 2,
  itemTypes: [56],
} as const satisfies TemperItemCategoryTree
