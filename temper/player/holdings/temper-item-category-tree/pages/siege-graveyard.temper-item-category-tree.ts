import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeGraveyard = {
  id: "01a05fcf-f83c-70f3-b3a3-4fd61dbbed14",
  type: "page-type/temper-item-category-tree",
  slug: "siege-graveyard",
  title: "Graveyard",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 6,
  specializedItemTypes: [405],
} as const satisfies TemperItemCategoryTree
