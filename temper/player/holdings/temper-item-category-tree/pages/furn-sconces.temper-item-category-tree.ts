import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSconces = {
  id: "01a05fcf-f80c-7d8d-bcfb-f52d44330910",
  type: "page-type/temper-item-category-tree",
  slug: "furn-sconces",
  title: "Sconces",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 8,
  furnitureSubcategoryIds: [122],
  createdAt: "2026-09-02T01:51:00.108Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
