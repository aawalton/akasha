import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeEquipment = {
  id: "01a05fcf-f83c-720f-aa28-e0401a1535bd",
  type: "page-type/temper-item-category-tree",
  slug: "siege-equipment",
  title: "Siege Equipment",
  parent: "temper-item-category-tree/alliance-war",
  displayOrder: 0,
  itemTypes: [6],
} as const satisfies TemperItemCategoryTree
