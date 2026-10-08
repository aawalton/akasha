import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnUtensils = {
  id: "01a05fcf-f818-7910-9af3-407295ef9e65",
  type: "page-type/temper-item-category-tree",
  slug: "furn-utensils",
  title: "Utensils",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 13,
  furnitureSubcategoryIds: [81],
  createdAt: "2026-09-02T01:51:00.120Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
