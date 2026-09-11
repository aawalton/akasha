import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnMachinery = {
  id: "01a05fcf-f800-7583-a49f-605585e7b858",
  type: "temper-item-category-tree",
  slug: "furn-machinery",
  title: "Machinery",
  parent: "furn-workshop",
  displayOrder: 1,
  furnitureSubcategoryIds: [169],
} as const satisfies TemperItemCategoryTree
