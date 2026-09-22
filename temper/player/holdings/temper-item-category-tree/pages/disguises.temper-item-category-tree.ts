import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const disguises = {
  id: "01a05fcf-f7d9-7087-a6c0-28269c72e0eb",
  type: "page-type/temper-item-category-tree",
  slug: "disguises",
  title: "Disguises",
  parent: "temper-item-category-tree/appearance",
  displayOrder: 1,
  itemTypes: [14],
} as const satisfies TemperItemCategoryTree
