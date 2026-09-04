import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnStorage = {
  id: "01a05fcf-f810-760e-835e-3d1a73583578",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-storage",
  title: "Storage",
  parent: "furn-services",
  displayOrder: 11,
  furnitureSubcategoryIds: [171],
} as const satisfies TemperItemCategoryTree
