import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkTincture = {
  id: "01a05fcf-f7dc-71c2-99ec-f64edf44993b",
  type: "page-type/temper-item-category-tree",
  slug: "drink-tincture",
  title: "Tincture",
  parent: "temper-item-category-tree/drink",
  displayOrder: 4,
  specializedItemTypes: [24],
} as const satisfies TemperItemCategoryTree
