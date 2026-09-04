import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const mediumBoots = {
  id: "01a05fcf-f82c-7b52-8f54-74b1e3286629",
  pageTypeSlug: "temper-item-category-tree",
  slug: "medium-boots",
  title: "Boots",
  parent: "medium-armor",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
