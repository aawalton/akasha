import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnVases = {
  id: "01a05fcf-f819-7d04-86ae-e2cb0564acda",
  type: "temper-item-category-tree",
  slug: "furn-vases",
  title: "Vases",
  parent: "furn-parlor",
  displayOrder: 7,
  furnitureSubcategoryIds: [56],
} as const satisfies TemperItemCategoryTree
