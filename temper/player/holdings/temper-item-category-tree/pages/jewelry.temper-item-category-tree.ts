import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const jewelry = {
  id: "01a05fcf-f825-768a-9481-01fd68c6aea4",
  type: "page-type/temper-item-category-tree",
  slug: "jewelry",
  title: "Jewelry",
  parent: "temper-item-category-tree/equipment",
  displayOrder: 2,
  filterTypes: [25],
  createdAt: "2026-09-02T01:51:00.133Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
