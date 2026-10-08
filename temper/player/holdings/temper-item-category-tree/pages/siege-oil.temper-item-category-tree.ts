import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeOil = {
  id: "01a05fcf-f83e-7498-8606-b7fbed83b6ea",
  type: "page-type/temper-item-category-tree",
  slug: "siege-oil",
  title: "Boiling Oil",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 3,
  specializedItemTypes: [407],
  createdAt: "2026-09-02T01:51:00.158Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
