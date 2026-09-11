import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnSaplings = {
  id: "01a05fcf-f80c-79bc-81f6-99f15de4c17b",
  type: "temper-item-category-tree",
  slug: "furn-saplings",
  title: "Saplings",
  parent: "furn-conservatory",
  displayOrder: 11,
  furnitureSubcategoryIds: [140],
} as const satisfies TemperItemCategoryTree
