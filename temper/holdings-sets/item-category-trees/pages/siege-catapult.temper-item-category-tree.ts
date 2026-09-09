import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeCatapult = {
  id: "01a05fcf-f83c-70a7-90ac-e14a7abf47f1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-catapult",
  title: "Catapult",
  parent: "siege-equipment",
  displayOrder: 2,
  specializedItemTypes: [404],
} as const satisfies TemperItemCategoryTree
