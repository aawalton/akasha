import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnUndercroft = {
  id: "01a05fcf-f817-7e76-bef6-fa01ef91ef6a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-undercroft",
  title: "Undercroft",
  parent: "furnishings",
  displayOrder: 5,
  furnitureCategoryIds: [6],
} as const satisfies TemperItemCategoryTree
