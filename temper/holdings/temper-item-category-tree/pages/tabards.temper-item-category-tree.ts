import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const tabards = {
  id: "01a05fcf-f843-76c7-9753-908fcecd0e06",
  type: "page-type/temper-item-category-tree",
  slug: "tabards",
  title: "Tabards",
  parent: "appearance",
  displayOrder: 2,
  itemTypes: [15],
} as const satisfies TemperItemCategoryTree
