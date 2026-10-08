import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSaplings = {
  id: "01a05fcf-f80c-79bc-81f6-99f15de4c17b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-saplings",
  title: "Saplings",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 11,
  furnitureSubcategoryIds: [140],
  createdAt: "2026-09-02T01:51:00.108Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
