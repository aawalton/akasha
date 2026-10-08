import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const ingredients = {
  id: "01a05fcf-f822-7ada-b3b2-23e1ad6c7845",
  type: "page-type/temper-item-category-tree",
  slug: "ingredients",
  title: "Ingredients",
  parent: "temper-item-category-tree/provisioning",
  displayOrder: 1,
  itemTypes: [10, 11, 27, 28],
  createdAt: "2026-09-02T01:51:00.130Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
