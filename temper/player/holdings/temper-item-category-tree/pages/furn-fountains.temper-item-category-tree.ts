import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnFountains = {
  id: "01a05fcf-f7f8-7465-a3c7-8a07fe1d7961",
  type: "page-type/temper-item-category-tree",
  slug: "furn-fountains",
  title: "Fountains",
  parent: "temper-item-category-tree/furn-courtyard",
  displayOrder: 0,
  furnitureSubcategoryIds: [73],
  createdAt: "2026-09-02T01:51:00.088Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
