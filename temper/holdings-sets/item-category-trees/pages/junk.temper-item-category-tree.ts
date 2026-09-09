import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const junk = {
  id: "01a05fcf-f825-724e-b83b-dbe6d4b2a4ae",
  pageTypeSlug: "temper-item-category-tree",
  slug: "junk",
  title: "Junk",
  parent: "miscellaneous",
  displayOrder: 7,
  filterTypes: [9],
} as const satisfies TemperItemCategoryTree
