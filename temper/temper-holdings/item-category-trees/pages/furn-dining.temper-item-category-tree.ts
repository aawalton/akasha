import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDining = {
  id: "01a05fcf-f7f1-7d99-a94d-64a21c7ab953",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-dining",
  title: "Dining",
  parent: "furnishings",
  displayOrder: 3,
  furnitureCategoryIds: [4],
} as const satisfies TemperItemCategoryTree
