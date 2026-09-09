import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lockpicks = {
  id: "01a05fcf-f829-78e1-89f7-fe25b4cc1509",
  pageTypeSlug: "temper-item-category-tree",
  slug: "lockpicks",
  title: "Lockpicks",
  parent: "consumables",
  displayOrder: 7,
  itemTypes: [22],
} as const satisfies TemperItemCategoryTree
