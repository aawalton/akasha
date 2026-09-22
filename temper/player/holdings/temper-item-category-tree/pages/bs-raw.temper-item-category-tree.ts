import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const bsRaw = {
  id: "01a05fcf-f7bf-7512-8c13-50da80f374ad",
  type: "page-type/temper-item-category-tree",
  slug: "bs-raw",
  title: "Raw Materials",
  parent: "temper-item-category-tree/blacksmithing",
  displayOrder: 1,
  itemTypes: [35],
} as const satisfies TemperItemCategoryTree
