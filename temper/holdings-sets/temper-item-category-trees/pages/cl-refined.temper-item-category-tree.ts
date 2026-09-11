import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const clRefined = {
  id: "01a05fcf-f7c0-7bee-9172-de4a7ee86dba",
  type: "temper-item-category-tree",
  slug: "cl-refined",
  title: "Refined Materials",
  parent: "clothing",
  displayOrder: 2,
  itemTypes: [40],
} as const satisfies TemperItemCategoryTree
