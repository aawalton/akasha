import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const trash = {
  id: "01a05fcf-f844-7560-aa44-caf65bb248e3",
  type: "temper-item-category-tree",
  slug: "trash",
  title: "Trash",
  parent: "treasures",
  displayOrder: 3,
  itemTypes: [48],
} as const satisfies TemperItemCategoryTree
