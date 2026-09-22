import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const fish = {
  id: "01a05fcf-f7e0-7ead-a121-61b47b4fd2a8",
  type: "page-type/temper-item-category-tree",
  slug: "fish",
  title: "Fish",
  parent: "temper-item-category-tree/fishing",
  displayOrder: 1,
  itemTypes: [54],
} as const satisfies TemperItemCategoryTree
