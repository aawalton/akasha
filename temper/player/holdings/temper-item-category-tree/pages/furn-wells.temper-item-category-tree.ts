import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWells = {
  id: "01a05fcf-f81b-7717-85c3-1a9ee1ee78ca",
  type: "page-type/temper-item-category-tree",
  slug: "furn-wells",
  title: "Wells",
  parent: "temper-item-category-tree/furn-courtyard",
  displayOrder: 4,
  furnitureSubcategoryIds: [71],
  createdAt: "2026-09-02T01:51:00.123Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
