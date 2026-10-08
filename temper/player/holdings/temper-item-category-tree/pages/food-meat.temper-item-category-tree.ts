import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodMeat = {
  id: "01a05fcf-f7e3-7597-8f4d-334c6b5ec76f",
  type: "page-type/temper-item-category-tree",
  slug: "food-meat",
  title: "Meat",
  parent: "temper-item-category-tree/food",
  displayOrder: 0,
  specializedItemTypes: [1],
  createdAt: "2026-09-02T01:51:00.067Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
