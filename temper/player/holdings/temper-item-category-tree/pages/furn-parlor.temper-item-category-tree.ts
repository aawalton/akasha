import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnParlor = {
  id: "01a05fcf-f806-707e-a9db-431d8b7b42e7",
  type: "page-type/temper-item-category-tree",
  slug: "furn-parlor",
  title: "Parlor",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 1,
  furnitureCategoryIds: [2],
  createdAt: "2026-09-02T01:51:00.102Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
