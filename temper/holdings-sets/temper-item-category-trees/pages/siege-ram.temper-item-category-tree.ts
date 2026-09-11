import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const siegeRam = {
  id: "01a05fcf-f83e-7cdc-a218-17e48f2940f0",
  type: "temper-item-category-tree",
  slug: "siege-ram",
  title: "Battering Ram",
  parent: "siege-equipment",
  displayOrder: 1,
  specializedItemTypes: [402],
} as const satisfies TemperItemCategoryTree
