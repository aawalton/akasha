import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const reagents = {
  id: "01a05fcf-f834-7bd6-b6e6-c8c574e828bc",
  pageTypeSlug: "temper-item-category-tree",
  slug: "reagents",
  title: "Reagents",
  parent: "alchemy",
  displayOrder: 1,
  itemTypes: [31],
} as const satisfies TemperItemCategoryTree
