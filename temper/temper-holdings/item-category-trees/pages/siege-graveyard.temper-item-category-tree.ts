import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeGraveyard = {
  id: "01a05fcf-f83c-70f3-b3a3-4fd61dbbed14",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-graveyard",
  title: "Graveyard",
  parent: "siege-equipment",
  displayOrder: 6,
  specializedItemTypes: [405],
} as const satisfies TemperItemCategoryTree
