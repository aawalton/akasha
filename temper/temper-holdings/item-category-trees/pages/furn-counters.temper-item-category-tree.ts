import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCounters = {
  id: "01a05fcf-f7ee-72f3-a29e-c7b76302c765",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-counters",
  title: "Counters",
  parent: "furn-dining",
  displayOrder: 2,
  furnitureSubcategoryIds: [66],
} as const satisfies TemperItemCategoryTree
