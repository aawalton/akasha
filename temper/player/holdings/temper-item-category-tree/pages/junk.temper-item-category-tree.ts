import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const junk = {
  id: "01a05fcf-f825-724e-b83b-dbe6d4b2a4ae",
  type: "page-type/temper-item-category-tree",
  slug: "junk",
  title: "Junk",
  parent: "temper-item-category-tree/miscellaneous",
  displayOrder: 7,
  filterTypes: [9],
} as const satisfies TemperItemCategoryTree
