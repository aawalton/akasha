import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnStatues = {
  id: "01a05fcf-f80f-7b61-9ff0-1d92d2831c20",
  type: "page-type/temper-item-category-tree",
  slug: "furn-statues",
  title: "Statues",
  parent: "temper-item-category-tree/furn-courtyard",
  displayOrder: 2,
  furnitureSubcategoryIds: [69],
} as const satisfies TemperItemCategoryTree
