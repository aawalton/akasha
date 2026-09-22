import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeCatapult = {
  id: "01a05fcf-f83c-70a7-90ac-e14a7abf47f1",
  type: "page-type/temper-item-category-tree",
  slug: "siege-catapult",
  title: "Catapult",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 2,
  specializedItemTypes: [404],
} as const satisfies TemperItemCategoryTree
