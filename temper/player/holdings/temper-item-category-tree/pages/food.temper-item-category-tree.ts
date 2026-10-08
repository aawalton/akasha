import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const food = {
  id: "01a05fcf-f7e5-7171-aa4f-e30a23a7b0fb",
  type: "page-type/temper-item-category-tree",
  slug: "food",
  title: "Food",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 0,
  itemTypes: [4],
  createdAt: "2026-09-02T01:51:00.069Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
