import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const reagentFungi = {
  id: "01a05fcf-f834-7be1-8aa4-a223d564bf53",
  pageTypeSlug: "temper-item-category-tree",
  slug: "reagent-fungi",
  title: "Fungi",
  parent: "reagents",
  displayOrder: 1,
  specializedItemTypes: [151],
} as const satisfies TemperItemCategoryTree
