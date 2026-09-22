import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTapestries = {
  id: "01a05fcf-f812-7034-ac25-9eb3f6a5d399",
  type: "page-type/temper-item-category-tree",
  slug: "furn-tapestries",
  title: "Tapestries",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 5,
  furnitureSubcategoryIds: [51],
} as const satisfies TemperItemCategoryTree
