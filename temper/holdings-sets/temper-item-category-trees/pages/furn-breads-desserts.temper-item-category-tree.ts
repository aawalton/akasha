import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnBreadsDesserts = {
  id: "01a05fcf-f7ea-7bd4-aead-c3cc01ff85c9",
  type: "temper-item-category-tree",
  slug: "furn-breads-desserts",
  title: "Breads and Desserts",
  parent: "furn-hearth",
  displayOrder: 1,
  furnitureSubcategoryIds: [155],
} as const satisfies TemperItemCategoryTree
