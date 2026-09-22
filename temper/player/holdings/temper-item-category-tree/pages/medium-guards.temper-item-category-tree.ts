import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mediumGuards = {
  id: "01a05fcf-f82c-7d01-958f-a1b27e4eab39",
  type: "page-type/temper-item-category-tree",
  slug: "medium-guards",
  title: "Guards",
  parent: "temper-item-category-tree/medium-armor",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
