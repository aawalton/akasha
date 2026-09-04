import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const bsRefined = {
  id: "01a05fcf-f7bf-7086-8fef-0a87dd846477",
  pageTypeSlug: "temper-item-category-tree",
  slug: "bs-refined",
  title: "Refined Materials",
  parent: "blacksmithing",
  displayOrder: 2,
  specializedItemTypes: [1550],
} as const satisfies TemperItemCategoryTree
