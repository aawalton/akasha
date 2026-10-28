import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnConservatory = {
  id: "01a05fcf-f7ed-7634-9dae-a200cc3c9652",
  type: "page-type/temper-item-category-tree",
  slug: "furn-conservatory",
  title: "Conservatory",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 10,
  furnitureCategoryIds: [12],
  createdAt: "2026-09-02T01:51:00.077Z",
  updatedAt: "2026-10-28T19:29:15.609Z",
} as const satisfies TemperItemCategoryTree
