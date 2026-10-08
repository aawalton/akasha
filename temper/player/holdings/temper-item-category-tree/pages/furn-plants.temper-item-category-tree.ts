import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPlants = {
  id: "01a05fcf-f808-71a2-95d7-c47a22890cb2",
  type: "page-type/temper-item-category-tree",
  slug: "furn-plants",
  title: "Plants",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 10,
  furnitureSubcategoryIds: [108],
  createdAt: "2026-09-02T01:51:00.104Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
