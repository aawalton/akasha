import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnIndriks = {
  id: "01a05fcf-f7fc-7b19-940b-86f129ad6a60",
  type: "page-type/temper-item-category-tree",
  slug: "furn-indriks",
  title: "Indriks",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 10,
  furnitureSubcategoryIds: [210],
} as const satisfies TemperItemCategoryTree
