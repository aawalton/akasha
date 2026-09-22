import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const wwFurnMat = {
  id: "01a05fcf-f849-7409-9d6e-885afb8ccc03",
  type: "page-type/temper-item-category-tree",
  slug: "ww-furn-mat",
  title: "Furnishing Materials",
  parent: "temper-item-category-tree/woodworking",
  displayOrder: 0,
  filterTypes: [15],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
