import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnEsoPlus = {
  id: "01a05fcf-f7f6-7a2d-b328-7f2cf2f40639",
  type: "page-type/temper-item-category-tree",
  slug: "furn-eso-plus",
  title: "ESO Plus",
  parent: "temper-item-category-tree/furn-gallery",
  displayOrder: 2,
  furnitureSubcategoryIds: [183],
} as const satisfies TemperItemCategoryTree
