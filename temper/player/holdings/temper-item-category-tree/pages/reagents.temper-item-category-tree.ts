import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const reagents = {
  id: "01a05fcf-f834-7bd6-b6e6-c8c574e828bc",
  type: "page-type/temper-item-category-tree",
  slug: "reagents",
  title: "Reagents",
  parent: "temper-item-category-tree/alchemy",
  displayOrder: 1,
  itemTypes: [31],
} as const satisfies TemperItemCategoryTree
