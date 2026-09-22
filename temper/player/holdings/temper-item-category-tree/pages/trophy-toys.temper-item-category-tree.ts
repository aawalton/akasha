import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const trophyToys = {
  id: "01a05fcf-f847-71f1-8e85-5c9f29a495ff",
  type: "page-type/temper-item-category-tree",
  slug: "trophy-toys",
  title: "Toys",
  parent: "temper-item-category-tree/trophies",
  displayOrder: 2,
  specializedItemTypes: [111],
} as const satisfies TemperItemCategoryTree
