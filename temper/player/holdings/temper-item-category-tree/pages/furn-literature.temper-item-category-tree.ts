import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnLiterature = {
  id: "01a05fcf-f800-7900-ae56-cc0b7ef6574f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-literature",
  title: "Literature",
  parent: "temper-item-category-tree/furn-library",
  displayOrder: 1,
  furnitureSubcategoryIds: [61],
  createdAt: "2026-09-02T01:51:00.096Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
