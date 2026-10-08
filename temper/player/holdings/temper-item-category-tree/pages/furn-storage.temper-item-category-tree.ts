import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnStorage = {
  id: "01a05fcf-f810-760e-835e-3d1a73583578",
  type: "page-type/temper-item-category-tree",
  slug: "furn-storage",
  title: "Storage",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 11,
  furnitureSubcategoryIds: [171],
  createdAt: "2026-09-02T01:51:00.112Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
