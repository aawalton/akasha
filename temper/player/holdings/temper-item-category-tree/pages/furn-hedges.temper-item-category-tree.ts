import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnHedges = {
  id: "01a05fcf-f7fa-71c4-b706-c190d0ec2390",
  type: "page-type/temper-item-category-tree",
  slug: "furn-hedges",
  title: "Hedges",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 7,
  furnitureSubcategoryIds: [141],
} as const satisfies TemperItemCategoryTree
