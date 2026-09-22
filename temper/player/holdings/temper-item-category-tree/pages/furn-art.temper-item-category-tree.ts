import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnArt = {
  id: "01a05fcf-f7e6-7f34-8f76-e6da48dee47e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-art",
  title: "Art",
  parent: "temper-item-category-tree/furn-gallery",
  displayOrder: 0,
  furnitureSubcategoryIds: [91],
} as const satisfies TemperItemCategoryTree
