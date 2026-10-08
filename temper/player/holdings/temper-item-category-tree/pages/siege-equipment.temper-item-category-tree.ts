import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeEquipment = {
  id: "01a05fcf-f83c-720f-aa28-e0401a1535bd",
  type: "page-type/temper-item-category-tree",
  slug: "siege-equipment",
  title: "Siege Equipment",
  parent: "temper-item-category-tree/alliance-war",
  displayOrder: 0,
  itemTypes: [6],
  createdAt: "2026-09-02T01:51:00.156Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
