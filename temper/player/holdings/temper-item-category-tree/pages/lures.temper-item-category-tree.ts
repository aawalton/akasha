import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lures = {
  id: "01a05fcf-f829-7137-b4cb-ef1ef9aa7525",
  type: "page-type/temper-item-category-tree",
  slug: "lures",
  title: "Lures",
  parent: "temper-item-category-tree/fishing",
  displayOrder: 0,
  itemTypes: [16],
  createdAt: "2026-09-02T01:51:00.137Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
