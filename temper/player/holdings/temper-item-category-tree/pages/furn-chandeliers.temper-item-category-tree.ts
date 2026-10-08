import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnChandeliers = {
  id: "01a05fcf-f7ed-7e82-ad87-cfe11dd03b43",
  type: "page-type/temper-item-category-tree",
  slug: "furn-chandeliers",
  title: "Chandeliers",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 2,
  furnitureSubcategoryIds: [124],
  createdAt: "2026-09-02T01:51:00.077Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
