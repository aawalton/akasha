import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnKnickKnacks = {
  id: "01a05fcf-f7fd-713c-9ebc-119252b22eb9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-knick-knacks",
  title: "Knick-Knacks",
  parent: "furn-parlor",
  displayOrder: 2,
  furnitureSubcategoryIds: [55],
} as const satisfies TemperItemCategoryTree
