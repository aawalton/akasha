import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const trash = {
  id: "01a05fcf-f844-7560-aa44-caf65bb248e3",
  pageTypeSlug: "temper-item-category-tree",
  slug: "trash",
  title: "Trash",
  parent: "treasures",
  displayOrder: 3,
  itemTypes: [48],
} as const satisfies TemperItemCategoryTree
