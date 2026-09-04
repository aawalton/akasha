import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTapestries = {
  id: "01a05fcf-f812-7034-ac25-9eb3f6a5d399",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-tapestries",
  title: "Tapestries",
  parent: "furn-parlor",
  displayOrder: 5,
  furnitureSubcategoryIds: [51],
} as const satisfies TemperItemCategoryTree
