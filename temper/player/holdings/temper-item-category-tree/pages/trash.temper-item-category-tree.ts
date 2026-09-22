import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const trash = {
  id: "01a05fcf-f844-7560-aa44-caf65bb248e3",
  type: "page-type/temper-item-category-tree",
  slug: "trash",
  title: "Trash",
  parent: "temper-item-category-tree/treasures",
  displayOrder: 3,
  itemTypes: [48],
} as const satisfies TemperItemCategoryTree
