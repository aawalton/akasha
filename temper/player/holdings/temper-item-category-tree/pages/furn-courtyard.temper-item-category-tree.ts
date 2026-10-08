import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCourtyard = {
  id: "01a05fcf-f7ee-7301-a5db-9f14202553c9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-courtyard",
  title: "Courtyard",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 4,
  furnitureCategoryIds: [5],
  createdAt: "2026-09-02T01:51:00.078Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
