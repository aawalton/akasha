import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTraps = {
  id: "01a05fcf-f816-75ad-9d31-4eac9d49842c",
  type: "page-type/temper-item-category-tree",
  slug: "furn-traps",
  title: "Traps",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 14,
  furnitureSubcategoryIds: [182],
  createdAt: "2026-09-02T01:51:00.118Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
