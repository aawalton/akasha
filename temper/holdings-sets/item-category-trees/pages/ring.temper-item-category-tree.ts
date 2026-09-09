import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const ring = {
  id: "01a05fcf-f838-715d-999c-9abed6914eab",
  pageTypeSlug: "temper-item-category-tree",
  slug: "ring",
  title: "Ring",
  parent: "jewelry",
  displayOrder: 1,
  equipTypes: [12],
} as const satisfies TemperItemCategoryTree
