import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavyGirdle = {
  id: "01a05fcf-f820-7ed4-96d2-02b50a30403a",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-girdle",
  title: "Girdle",
  parent: "temper-item-category-tree/heavy-armor",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
