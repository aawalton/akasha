import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const jcRefined = {
  id: "01a05fcf-f824-7c07-bce0-b96eb710f5f2",
  pageTypeSlug: "temper-item-category-tree",
  slug: "jc-refined",
  title: "Refined Materials",
  parent: "jewelry-crafting",
  displayOrder: 2,
  itemTypes: [64],
} as const satisfies TemperItemCategoryTree
