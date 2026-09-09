import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnSuite = {
  id: "01a05fcf-f811-739d-8c04-ad0b84b7356e",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-suite",
  title: "Suite",
  parent: "furnishings",
  displayOrder: 0,
  furnitureCategoryIds: [1],
} as const satisfies TemperItemCategoryTree
