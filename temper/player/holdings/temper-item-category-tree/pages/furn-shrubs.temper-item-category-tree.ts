import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnShrubs = {
  id: "01a05fcf-f80d-768f-9a43-9e9b8f91c13c",
  type: "page-type/temper-item-category-tree",
  slug: "furn-shrubs",
  title: "Shrubs",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 12,
  furnitureSubcategoryIds: [109],
  createdAt: "2026-09-02T01:51:00.109Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
