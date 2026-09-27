import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const trophies = {
  id: "01a05fcf-f846-77dc-9c7f-f67085d7d9e1",
  type: "page-type/temper-item-category-tree",
  slug: "trophies",
  title: "Trophies",
  parent: "temper-item-category-tree/miscellaneous",
  displayOrder: 5,
  itemTypes: [5],
} as const satisfies TemperItemCategoryTree
