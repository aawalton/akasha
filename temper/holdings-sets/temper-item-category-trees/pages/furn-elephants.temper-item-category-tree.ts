import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnElephants = {
  id: "01a05fcf-f7f5-721a-bbe5-2c6c70f7651a",
  type: "temper-item-category-tree",
  slug: "furn-elephants",
  title: "Elephants",
  parent: "furn-mounts",
  displayOrder: 7,
  furnitureSubcategoryIds: [203],
} as const satisfies TemperItemCategoryTree
