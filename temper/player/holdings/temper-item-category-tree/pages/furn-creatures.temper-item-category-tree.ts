import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCreatures = {
  id: "01a05fcf-f7ef-7bc5-8e68-daaec36155b9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-creatures",
  title: "Creatures",
  parent: "temper-item-category-tree/furn-miscellaneous",
  displayOrder: 0,
  furnitureSubcategoryIds: [161],
  createdAt: "2026-09-02T01:51:00.079Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
