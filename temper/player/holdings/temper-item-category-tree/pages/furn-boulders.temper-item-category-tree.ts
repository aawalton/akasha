import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBoulders = {
  id: "01a05fcf-f7e9-7c9e-981c-62230732d9fd",
  type: "page-type/temper-item-category-tree",
  slug: "furn-boulders",
  title: "Boulders and Large Rocks",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 1,
  furnitureSubcategoryIds: [151],
  createdAt: "2026-09-02T01:51:00.073Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
