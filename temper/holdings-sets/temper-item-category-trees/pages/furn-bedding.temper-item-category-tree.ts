import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBedding = {
  id: "01a05fcf-f7e8-7c98-baf9-d74085758e6d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-bedding",
  title: "Bedding",
  parent: "furn-suite",
  displayOrder: 1,
  furnitureSubcategoryIds: [45],
} as const satisfies TemperItemCategoryTree
