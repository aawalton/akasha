import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTrunks = {
  id: "01a05fcf-f816-7687-8fbe-7c7ad6f2acec",
  type: "page-type/temper-item-category-tree",
  slug: "furn-trunks",
  title: "Trunks",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 7,
  furnitureSubcategoryIds: [48],
  createdAt: "2026-09-02T01:51:00.118Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
