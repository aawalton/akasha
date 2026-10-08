import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodSavoury = {
  id: "01a05fcf-f7e4-792a-b20e-4063d71fb9a6",
  type: "page-type/temper-item-category-tree",
  slug: "food-savoury",
  title: "Savoury",
  parent: "temper-item-category-tree/food",
  displayOrder: 3,
  specializedItemTypes: [4],
  createdAt: "2026-09-02T01:51:00.068Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
