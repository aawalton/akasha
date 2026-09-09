import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const additives = {
  id: "01a05fcf-f7b9-796f-b25c-b843ce6fc1ee",
  pageTypeSlug: "temper-item-category-tree",
  slug: "additives",
  title: "Additives",
  parent: "ingredients",
  displayOrder: 2,
  specializedItemTypes: [43, 47],
} as const satisfies TemperItemCategoryTree
