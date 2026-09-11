import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnShrubs = {
  id: "01a05fcf-f80d-768f-9a43-9e9b8f91c13c",
  type: "temper-item-category-tree",
  slug: "furn-shrubs",
  title: "Shrubs",
  parent: "furn-conservatory",
  displayOrder: 12,
  furnitureSubcategoryIds: [109],
} as const satisfies TemperItemCategoryTree
