import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnStatues = {
  id: "01a05fcf-f80f-7b61-9ff0-1d92d2831c20",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-statues",
  title: "Statues",
  parent: "furn-courtyard",
  displayOrder: 2,
  furnitureSubcategoryIds: [69],
} as const satisfies TemperItemCategoryTree
