import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const ring = {
  id: "01a05fcf-f838-715d-999c-9abed6914eab",
  type: "page-type/temper-item-category-tree",
  slug: "ring",
  title: "Ring",
  parent: "temper-item-category-tree/jewelry",
  displayOrder: 1,
  equipTypes: [12],
} as const satisfies TemperItemCategoryTree
