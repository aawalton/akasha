import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnRugsCarpets = {
  id: "01a05fcf-f80b-775c-a7ef-b9e6cb7a33f1",
  type: "page-type/temper-item-category-tree",
  slug: "furn-rugs-carpets",
  title: "Rugs and Carpets",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 3,
  furnitureSubcategoryIds: [52],
  createdAt: "2026-09-02T01:51:00.107Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
