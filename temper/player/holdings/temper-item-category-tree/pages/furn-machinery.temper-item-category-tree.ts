import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMachinery = {
  id: "01a05fcf-f800-7583-a49f-605585e7b858",
  type: "page-type/temper-item-category-tree",
  slug: "furn-machinery",
  title: "Machinery",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 1,
  furnitureSubcategoryIds: [169],
  createdAt: "2026-09-02T01:51:00.096Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
