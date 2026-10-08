import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBrekkas = {
  id: "01a05fcf-f7ea-7fa1-a2f5-9436c8d7f9ae",
  type: "page-type/temper-item-category-tree",
  slug: "furn-brekkas",
  title: "Brekkas",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 2,
  furnitureSubcategoryIds: [209],
  createdAt: "2026-09-02T01:51:00.074Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
