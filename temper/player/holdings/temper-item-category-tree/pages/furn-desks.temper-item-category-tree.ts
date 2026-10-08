import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDesks = {
  id: "01a05fcf-f7f1-7f0d-91de-3f581c36a45e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-desks",
  title: "Desks",
  parent: "temper-item-category-tree/furn-library",
  displayOrder: 0,
  furnitureSubcategoryIds: [60],
  createdAt: "2026-09-02T01:51:00.081Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
