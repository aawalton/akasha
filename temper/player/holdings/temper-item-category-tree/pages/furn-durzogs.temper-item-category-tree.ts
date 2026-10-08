import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDurzogs = {
  id: "01a05fcf-f7f4-7880-8a7e-8fba747a7437",
  type: "page-type/temper-item-category-tree",
  slug: "furn-durzogs",
  title: "Durzogs",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 5,
  furnitureSubcategoryIds: [207],
  createdAt: "2026-09-02T01:51:00.084Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
