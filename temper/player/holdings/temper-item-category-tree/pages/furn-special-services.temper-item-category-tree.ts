import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSpecialServices = {
  id: "01a05fcf-f80f-7f36-a81d-20e12424fa9b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-special-services",
  title: "Special",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 10,
  furnitureSubcategoryIds: [186],
  createdAt: "2026-09-02T01:51:00.111Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
