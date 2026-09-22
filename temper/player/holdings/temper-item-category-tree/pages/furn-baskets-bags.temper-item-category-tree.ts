import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBasketsBags = {
  id: "01a05fcf-f7e7-7c90-b1e1-1fec386d0e0a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-baskets-bags",
  title: "Baskets and Bags",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 0,
  furnitureSubcategoryIds: [86],
} as const satisfies TemperItemCategoryTree
