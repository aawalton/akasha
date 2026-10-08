import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeUniversal = {
  id: "01a05fcf-f83f-70f5-81ee-2b21fb9e3ab7",
  type: "page-type/temper-item-category-tree",
  slug: "siege-universal",
  title: "Universal",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 7,
  specializedItemTypes: [403],
  createdAt: "2026-09-02T01:51:00.159Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
