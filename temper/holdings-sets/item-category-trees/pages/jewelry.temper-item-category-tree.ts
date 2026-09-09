import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const jewelry = {
  id: "01a05fcf-f825-768a-9481-01fd68c6aea4",
  pageTypeSlug: "temper-item-category-tree",
  slug: "jewelry",
  title: "Jewelry",
  parent: "equipment",
  displayOrder: 2,
  filterTypes: [25],
} as const satisfies TemperItemCategoryTree
