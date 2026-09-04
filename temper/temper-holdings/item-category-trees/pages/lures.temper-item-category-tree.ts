import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lures = {
  id: "01a05fcf-f829-7137-b4cb-ef1ef9aa7525",
  pageTypeSlug: "temper-item-category-tree",
  slug: "lures",
  title: "Lures",
  parent: "fishing",
  displayOrder: 0,
  itemTypes: [16],
} as const satisfies TemperItemCategoryTree
