import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeEquipment = {
  id: "01a05fcf-f83c-720f-aa28-e0401a1535bd",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-equipment",
  title: "Siege Equipment",
  parent: "alliance-war",
  displayOrder: 0,
  itemTypes: [6],
} as const satisfies TemperItemCategoryTree
