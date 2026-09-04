import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const trophyToys = {
  id: "01a05fcf-f847-71f1-8e85-5c9f29a495ff",
  pageTypeSlug: "temper-item-category-tree",
  slug: "trophy-toys",
  title: "Toys",
  parent: "trophies",
  displayOrder: 2,
  specializedItemTypes: [111],
} as const satisfies TemperItemCategoryTree
