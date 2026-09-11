import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnDomestic = {
  id: "01a05fcf-f7f3-7433-88f5-5c086e72b6ea",
  type: "temper-item-category-tree",
  slug: "furn-domestic",
  title: "Domestic",
  parent: "furn-pets",
  displayOrder: 2,
  furnitureSubcategoryIds: [180],
} as const satisfies TemperItemCategoryTree
