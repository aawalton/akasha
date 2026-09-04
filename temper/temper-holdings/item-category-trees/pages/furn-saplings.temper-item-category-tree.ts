import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnSaplings = {
  id: "01a05fcf-f80c-79bc-81f6-99f15de4c17b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-saplings",
  title: "Saplings",
  parent: "furn-conservatory",
  displayOrder: 11,
  furnitureSubcategoryIds: [140],
} as const satisfies TemperItemCategoryTree
