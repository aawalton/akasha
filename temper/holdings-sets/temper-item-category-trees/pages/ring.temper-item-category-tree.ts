import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const ring = {
  id: "01a05fcf-f838-715d-999c-9abed6914eab",
  type: "temper-item-category-tree",
  slug: "ring",
  title: "Ring",
  parent: "jewelry",
  displayOrder: 1,
  equipTypes: [12],
} as const satisfies TemperItemCategoryTree
