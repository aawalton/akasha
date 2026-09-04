import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const mediumHelmet = {
  id: "01a05fcf-f82c-7262-b612-9638634a5e27",
  pageTypeSlug: "temper-item-category-tree",
  slug: "medium-helmet",
  title: "Helmet",
  parent: "medium-armor",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
