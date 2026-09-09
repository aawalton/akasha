import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const clRefined = {
  id: "01a05fcf-f7c0-7bee-9172-de4a7ee86dba",
  pageTypeSlug: "temper-item-category-tree",
  slug: "cl-refined",
  title: "Refined Materials",
  parent: "clothing",
  displayOrder: 2,
  itemTypes: [40],
} as const satisfies TemperItemCategoryTree
