import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnRacks = {
  id: "01a05fcf-f80a-7ab0-90a4-5380fe5560d7",
  type: "page-type/temper-item-category-tree",
  slug: "furn-racks",
  title: "Racks",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 6,
  furnitureSubcategoryIds: [112],
  createdAt: "2026-09-02T01:51:00.106Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
