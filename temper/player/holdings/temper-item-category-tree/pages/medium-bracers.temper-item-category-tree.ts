import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mediumBracers = {
  id: "01a05fcf-f82c-7a09-8035-ab832491ca0c",
  type: "page-type/temper-item-category-tree",
  slug: "medium-bracers",
  title: "Bracers",
  parent: "temper-item-category-tree/medium-armor",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
