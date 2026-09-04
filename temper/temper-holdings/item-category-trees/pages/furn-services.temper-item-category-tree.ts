import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnServices = {
  id: "01a05fcf-f80d-7a4e-9c73-b361cf7c0f7f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-services",
  title: "Services",
  parent: "furnishings",
  displayOrder: 14,
  furnitureCategoryIds: [24, 25],
} as const satisfies TemperItemCategoryTree
