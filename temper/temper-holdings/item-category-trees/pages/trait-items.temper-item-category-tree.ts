import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const traitItems = {
  id: "01a05fcf-f844-7bfa-b33b-bb455d160870",
  pageTypeSlug: "temper-item-category-tree",
  slug: "trait-items",
  title: "Trait Items",
  parent: "crafting",
  displayOrder: 8,
  filterTypes: [20],
} as const satisfies TemperItemCategoryTree
