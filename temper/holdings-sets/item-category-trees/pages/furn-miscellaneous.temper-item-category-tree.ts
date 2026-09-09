import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMiscellaneous = {
  id: "01a05fcf-f802-7787-bde1-10a25a83356f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-miscellaneous",
  title: "Miscellaneous",
  parent: "furnishings",
  displayOrder: 12,
  furnitureCategoryIds: [13, 14],
} as const satisfies TemperItemCategoryTree
