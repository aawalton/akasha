import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkTonic = {
  id: "01a05fcf-f7dd-7d86-b602-1c9bd8f551d3",
  type: "page-type/temper-item-category-tree",
  slug: "drink-tonic",
  title: "Tonic",
  parent: "temper-item-category-tree/drink",
  displayOrder: 2,
  specializedItemTypes: [22],
} as const satisfies TemperItemCategoryTree
