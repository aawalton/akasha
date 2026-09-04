import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const costumes = {
  id: "01a05fcf-f7d5-78c6-b782-20d0185e6081",
  pageTypeSlug: "temper-item-category-tree",
  slug: "costumes",
  title: "Costumes",
  parent: "appearance",
  displayOrder: 0,
  itemTypes: [13],
} as const satisfies TemperItemCategoryTree
