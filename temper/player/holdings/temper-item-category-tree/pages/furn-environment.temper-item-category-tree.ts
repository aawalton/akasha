import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnEnvironment = {
  id: "01a05fcf-f7f5-7f8f-9e27-5348d8e023f9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-environment",
  title: "Environment",
  parent: "temper-item-category-tree/furn-miscellaneous",
  displayOrder: 1,
  furnitureSubcategoryIds: [166],
  createdAt: "2026-09-02T01:51:00.085Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
