import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPets = {
  id: "01a05fcf-f806-7ace-8809-da8bfcf70b98",
  type: "page-type/temper-item-category-tree",
  slug: "furn-pets",
  title: "Non-Combat Pets",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 15,
  furnitureCategoryIds: [32],
  createdAt: "2026-09-02T01:51:00.102Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
