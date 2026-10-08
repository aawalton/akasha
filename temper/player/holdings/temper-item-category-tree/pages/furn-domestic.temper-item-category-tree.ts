import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDomestic = {
  id: "01a05fcf-f7f3-7433-88f5-5c086e72b6ea",
  type: "page-type/temper-item-category-tree",
  slug: "furn-domestic",
  title: "Domestic",
  parent: "temper-item-category-tree/furn-pets",
  displayOrder: 2,
  furnitureSubcategoryIds: [180],
  createdAt: "2026-09-02T01:51:00.083Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
