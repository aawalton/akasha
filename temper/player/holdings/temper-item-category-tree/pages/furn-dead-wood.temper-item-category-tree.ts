import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDeadWood = {
  id: "01a05fcf-f7f0-7850-b1ec-ecbf1d04cfe6",
  type: "page-type/temper-item-category-tree",
  slug: "furn-dead-wood",
  title: "Dead Wood",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 3,
  furnitureSubcategoryIds: [164],
  createdAt: "2026-09-02T01:51:00.080Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
