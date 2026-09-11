import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnDeadWood = {
  id: "01a05fcf-f7f0-7850-b1ec-ecbf1d04cfe6",
  type: "temper-item-category-tree",
  slug: "furn-dead-wood",
  title: "Dead Wood",
  parent: "furn-conservatory",
  displayOrder: 3,
  furnitureSubcategoryIds: [164],
} as const satisfies TemperItemCategoryTree
