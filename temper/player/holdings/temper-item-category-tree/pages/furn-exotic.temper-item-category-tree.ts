import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnExotic = {
  id: "01a05fcf-f7f6-7817-8b4c-ca376f6264b5",
  type: "page-type/temper-item-category-tree",
  slug: "furn-exotic",
  title: "Exotic",
  parent: "temper-item-category-tree/furn-pets",
  displayOrder: 3,
  furnitureSubcategoryIds: [179],
  createdAt: "2026-09-02T01:51:00.086Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
