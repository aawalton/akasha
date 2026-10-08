import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWorkshop = {
  id: "01a05fcf-f81c-763e-9ca6-12843ccd1b82",
  type: "page-type/temper-item-category-tree",
  slug: "furn-workshop",
  title: "Workshop",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 8,
  furnitureCategoryIds: [9],
  createdAt: "2026-09-02T01:51:00.124Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
