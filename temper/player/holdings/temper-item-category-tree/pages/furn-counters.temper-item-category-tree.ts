import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCounters = {
  id: "01a05fcf-f7ee-72f3-a29e-c7b76302c765",
  type: "page-type/temper-item-category-tree",
  slug: "furn-counters",
  title: "Counters",
  parent: "temper-item-category-tree/furn-dining",
  displayOrder: 2,
  furnitureSubcategoryIds: [66],
} as const satisfies TemperItemCategoryTree
