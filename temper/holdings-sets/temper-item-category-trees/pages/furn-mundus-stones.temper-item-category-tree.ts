import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnMundusStones = {
  id: "01a05fcf-f804-72d8-a54e-978605111ab5",
  type: "temper-item-category-tree",
  slug: "furn-mundus-stones",
  title: "Mundus Stones",
  parent: "furn-services",
  displayOrder: 7,
  furnitureSubcategoryIds: [159],
} as const satisfies TemperItemCategoryTree
