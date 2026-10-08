import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDressers = {
  id: "01a05fcf-f7f3-7b7b-9051-6ab163db977a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-dressers",
  title: "Dressers",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 3,
  furnitureSubcategoryIds: [145],
  createdAt: "2026-09-02T01:51:00.083Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
