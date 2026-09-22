import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const clRaw = {
  id: "01a05fcf-f7c0-71ee-b100-73fae2e15474",
  type: "page-type/temper-item-category-tree",
  slug: "cl-raw",
  title: "Raw Materials",
  parent: "temper-item-category-tree/clothing",
  displayOrder: 1,
  itemTypes: [39],
} as const satisfies TemperItemCategoryTree
