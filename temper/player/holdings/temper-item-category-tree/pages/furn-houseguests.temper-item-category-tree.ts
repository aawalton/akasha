import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnHouseguests = {
  id: "01a05fcf-f7fb-7e70-9002-a91d69337ffe",
  type: "page-type/temper-item-category-tree",
  slug: "furn-houseguests",
  title: "Houseguests",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 4,
  furnitureSubcategoryIds: [188],
} as const satisfies TemperItemCategoryTree
