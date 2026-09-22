import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMundusStones = {
  id: "01a05fcf-f804-72d8-a54e-978605111ab5",
  type: "page-type/temper-item-category-tree",
  slug: "furn-mundus-stones",
  title: "Mundus Stones",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 7,
  furnitureSubcategoryIds: [159],
} as const satisfies TemperItemCategoryTree
