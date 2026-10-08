import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeCatapult = {
  id: "01a05fcf-f83c-70a7-90ac-e14a7abf47f1",
  type: "page-type/temper-item-category-tree",
  slug: "siege-catapult",
  title: "Catapult",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 2,
  specializedItemTypes: [404],
  createdAt: "2026-09-02T01:51:00.156Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
