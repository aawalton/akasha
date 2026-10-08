import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPottery = {
  id: "01a05fcf-f809-737a-a32f-152023c8626d",
  type: "page-type/temper-item-category-tree",
  slug: "furn-pottery",
  title: "Pottery",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 10,
  furnitureSubcategoryIds: [79],
  createdAt: "2026-09-02T01:51:00.105Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
