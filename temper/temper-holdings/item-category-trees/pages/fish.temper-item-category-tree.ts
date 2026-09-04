import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const fish = {
  id: "01a05fcf-f7e0-7ead-a121-61b47b4fd2a8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "fish",
  title: "Fish",
  parent: "fishing",
  displayOrder: 1,
  itemTypes: [54],
} as const satisfies TemperItemCategoryTree
