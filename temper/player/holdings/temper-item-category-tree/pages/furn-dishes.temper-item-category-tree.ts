import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDishes = {
  id: "01a05fcf-f7f2-770c-833b-b57b3cb78163",
  type: "page-type/temper-item-category-tree",
  slug: "furn-dishes",
  title: "Dishes",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 4,
  furnitureSubcategoryIds: [80],
  createdAt: "2026-09-02T01:51:00.082Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
