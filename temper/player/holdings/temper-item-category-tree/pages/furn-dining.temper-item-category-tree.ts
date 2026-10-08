import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDining = {
  id: "01a05fcf-f7f1-7d99-a94d-64a21c7ab953",
  type: "page-type/temper-item-category-tree",
  slug: "furn-dining",
  title: "Dining",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 3,
  furnitureCategoryIds: [4],
  createdAt: "2026-09-02T01:51:00.081Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
