import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeRam = {
  id: "01a05fcf-f83e-7cdc-a218-17e48f2940f0",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-ram",
  title: "Battering Ram",
  parent: "siege-equipment",
  displayOrder: 1,
  specializedItemTypes: [402],
} as const satisfies TemperItemCategoryTree
