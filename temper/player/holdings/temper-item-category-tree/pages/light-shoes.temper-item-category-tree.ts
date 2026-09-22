import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightShoes = {
  id: "01a05fcf-f828-7cdc-bce9-58655524f23d",
  type: "page-type/temper-item-category-tree",
  slug: "light-shoes",
  title: "Shoes",
  parent: "temper-item-category-tree/light-armor",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
