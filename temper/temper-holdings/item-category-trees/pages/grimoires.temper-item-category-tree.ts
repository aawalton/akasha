import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const grimoires = {
  id: "01a05fcf-f81e-746c-a0f2-abe5708f6e12",
  pageTypeSlug: "temper-item-category-tree",
  slug: "grimoires",
  title: "Grimoires",
  parent: "scribing",
  displayOrder: 0,
  specializedItemTypes: [3200],
} as const satisfies TemperItemCategoryTree
