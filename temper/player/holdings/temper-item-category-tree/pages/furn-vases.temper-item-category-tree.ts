import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnVases = {
  id: "01a05fcf-f819-7d04-86ae-e2cb0564acda",
  type: "page-type/temper-item-category-tree",
  slug: "furn-vases",
  title: "Vases",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 7,
  furnitureSubcategoryIds: [56],
} as const satisfies TemperItemCategoryTree
