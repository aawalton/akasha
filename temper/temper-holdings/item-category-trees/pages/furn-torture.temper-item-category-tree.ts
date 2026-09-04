import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTorture = {
  id: "01a05fcf-f815-7351-a158-60d836038249",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-torture",
  title: "Torture",
  parent: "furn-undercroft",
  displayOrder: 7,
  furnitureSubcategoryIds: [76],
} as const satisfies TemperItemCategoryTree
