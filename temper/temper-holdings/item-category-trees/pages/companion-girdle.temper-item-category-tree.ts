import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionGirdle = {
  id: "01a05fcf-f7c7-7cdf-9869-ad081cfd7d42",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-girdle",
  title: "Girdle",
  parent: "companion-heavy",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
