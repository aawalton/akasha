import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lightSash = {
  id: "01a05fcf-f828-7f32-939a-b44f2f120f46",
  pageTypeSlug: "temper-item-category-tree",
  slug: "light-sash",
  title: "Sash",
  parent: "light-armor",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
