import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodUnique = {
  id: "01a05fcf-f7e4-70d9-8dc6-b6c9ea581097",
  type: "page-type/temper-item-category-tree",
  slug: "food-unique",
  title: "Unique",
  parent: "temper-item-category-tree/food",
  displayOrder: 7,
  specializedItemTypes: [8],
  createdAt: "2026-09-02T01:51:00.068Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
