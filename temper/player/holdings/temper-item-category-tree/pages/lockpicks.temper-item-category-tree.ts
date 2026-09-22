import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lockpicks = {
  id: "01a05fcf-f829-78e1-89f7-fe25b4cc1509",
  type: "page-type/temper-item-category-tree",
  slug: "lockpicks",
  title: "Lockpicks",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 7,
  itemTypes: [22],
} as const satisfies TemperItemCategoryTree
