import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBedding = {
  id: "01a05fcf-f7e8-7c98-baf9-d74085758e6d",
  type: "page-type/temper-item-category-tree",
  slug: "furn-bedding",
  title: "Bedding",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 1,
  furnitureSubcategoryIds: [45],
} as const satisfies TemperItemCategoryTree
