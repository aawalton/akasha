import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkTincture = {
  id: "01a05fcf-f7dc-71c2-99ec-f64edf44993b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-tincture",
  title: "Tincture",
  parent: "drink",
  displayOrder: 4,
  specializedItemTypes: [24],
} as const satisfies TemperItemCategoryTree
