import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkTincture = {
  id: "01a05fcf-f7dc-71c2-99ec-f64edf44993b",
  type: "page-type/temper-item-category-tree",
  slug: "drink-tincture",
  title: "Tincture",
  parent: "temper-item-category-tree/drink",
  displayOrder: 4,
  specializedItemTypes: [24],
  createdAt: "2026-09-02T01:51:00.060Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
