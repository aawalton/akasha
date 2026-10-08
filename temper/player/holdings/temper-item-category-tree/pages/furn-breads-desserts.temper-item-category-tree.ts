import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBreadsDesserts = {
  id: "01a05fcf-f7ea-7bd4-aead-c3cc01ff85c9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-breads-desserts",
  title: "Breads and Desserts",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 1,
  furnitureSubcategoryIds: [155],
  createdAt: "2026-09-02T01:51:00.074Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
