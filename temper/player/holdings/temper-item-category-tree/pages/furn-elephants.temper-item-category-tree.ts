import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnElephants = {
  id: "01a05fcf-f7f5-721a-bbe5-2c6c70f7651a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-elephants",
  title: "Elephants",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 7,
  furnitureSubcategoryIds: [203],
  createdAt: "2026-09-02T01:51:00.085Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
