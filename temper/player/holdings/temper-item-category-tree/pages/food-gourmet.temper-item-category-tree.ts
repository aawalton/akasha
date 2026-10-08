import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodGourmet = {
  id: "01a05fcf-f7e2-7930-bb87-79e3428069f5",
  type: "page-type/temper-item-category-tree",
  slug: "food-gourmet",
  title: "Gourmet",
  parent: "temper-item-category-tree/food",
  displayOrder: 6,
  specializedItemTypes: [7],
  createdAt: "2026-09-02T01:51:00.066Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
