import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPaintings = {
  id: "01a05fcf-f806-7ec6-8fdd-94cc413b9ae1",
  type: "page-type/temper-item-category-tree",
  slug: "furn-paintings",
  title: "Paintings",
  parent: "temper-item-category-tree/furn-gallery",
  displayOrder: 5,
  furnitureSubcategoryIds: [53],
  createdAt: "2026-09-02T01:51:00.102Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
