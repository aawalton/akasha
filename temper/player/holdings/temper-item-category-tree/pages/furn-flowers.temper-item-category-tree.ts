import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnFlowers = {
  id: "01a05fcf-f7f7-7ed7-b739-060e6b3e4588",
  type: "page-type/temper-item-category-tree",
  slug: "furn-flowers",
  title: "Flowers",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 5,
  furnitureSubcategoryIds: [110],
  createdAt: "2026-09-02T01:51:00.087Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
