import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnLanterns = {
  id: "01a05fcf-f7fe-731d-8fe4-25256c3ec9fc",
  type: "page-type/temper-item-category-tree",
  slug: "furn-lanterns",
  title: "Lanterns",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 6,
  furnitureSubcategoryIds: [120],
  createdAt: "2026-09-02T01:51:00.094Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
