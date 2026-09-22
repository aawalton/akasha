import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnLunarChampion = {
  id: "01a05fcf-f800-780d-b45b-88c9eb4e3069",
  type: "page-type/temper-item-category-tree",
  slug: "furn-lunar-champion",
  title: "Lunar Champion Tablets",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 5,
  furnitureSubcategoryIds: [185],
} as const satisfies TemperItemCategoryTree
