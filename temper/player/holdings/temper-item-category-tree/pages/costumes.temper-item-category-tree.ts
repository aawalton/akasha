import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const costumes = {
  id: "01a05fcf-f7d5-78c6-b782-20d0185e6081",
  type: "page-type/temper-item-category-tree",
  slug: "costumes",
  title: "Costumes",
  parent: "temper-item-category-tree/appearance",
  displayOrder: 0,
  itemTypes: [13],
} as const satisfies TemperItemCategoryTree
