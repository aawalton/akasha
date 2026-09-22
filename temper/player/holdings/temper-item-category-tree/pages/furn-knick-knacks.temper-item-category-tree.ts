import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnKnickKnacks = {
  id: "01a05fcf-f7fd-713c-9ebc-119252b22eb9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-knick-knacks",
  title: "Knick-Knacks",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 2,
  furnitureSubcategoryIds: [55],
} as const satisfies TemperItemCategoryTree
