import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGeneral = {
  id: "01a05fcf-f7f9-720c-8816-7ee884282382",
  type: "page-type/temper-item-category-tree",
  slug: "furn-general",
  title: "General",
  parent: "temper-item-category-tree/furn-miscellaneous",
  displayOrder: 2,
  furnitureSubcategoryIds: [167],
  createdAt: "2026-09-02T01:51:00.089Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
