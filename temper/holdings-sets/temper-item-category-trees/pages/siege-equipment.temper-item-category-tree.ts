import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const siegeEquipment = {
  id: "01a05fcf-f83c-720f-aa28-e0401a1535bd",
  type: "temper-item-category-tree",
  slug: "siege-equipment",
  title: "Siege Equipment",
  parent: "alliance-war",
  displayOrder: 0,
  itemTypes: [6],
} as const satisfies TemperItemCategoryTree
