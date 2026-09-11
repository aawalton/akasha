import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnHouseguests = {
  id: "01a05fcf-f7fb-7e70-9002-a91d69337ffe",
  type: "temper-item-category-tree",
  slug: "furn-houseguests",
  title: "Houseguests",
  parent: "furn-services",
  displayOrder: 4,
  furnitureSubcategoryIds: [188],
} as const satisfies TemperItemCategoryTree
