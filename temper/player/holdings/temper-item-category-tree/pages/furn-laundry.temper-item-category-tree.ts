import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnLaundry = {
  id: "01a05fcf-f7fe-7460-acd3-2ce422a85c43",
  type: "page-type/temper-item-category-tree",
  slug: "furn-laundry",
  title: "Laundry",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 7,
  furnitureSubcategoryIds: [152],
  createdAt: "2026-09-02T01:51:00.094Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
