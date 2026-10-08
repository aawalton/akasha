import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lockpicks = {
  id: "01a05fcf-f829-78e1-89f7-fe25b4cc1509",
  type: "page-type/temper-item-category-tree",
  slug: "lockpicks",
  title: "Lockpicks",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 7,
  itemTypes: [22],
  createdAt: "2026-09-02T01:51:00.137Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
