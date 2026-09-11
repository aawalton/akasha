import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnLaundry = {
  id: "01a05fcf-f7fe-7460-acd3-2ce422a85c43",
  type: "temper-item-category-tree",
  slug: "furn-laundry",
  title: "Laundry",
  parent: "furn-hearth",
  displayOrder: 7,
  furnitureSubcategoryIds: [152],
} as const satisfies TemperItemCategoryTree
