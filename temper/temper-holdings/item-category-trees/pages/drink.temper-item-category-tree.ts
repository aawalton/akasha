import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drink = {
  id: "01a05fcf-f7de-7fc8-ae0d-63cfd9949c25",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink",
  title: "Drink",
  parent: "consumables",
  displayOrder: 1,
  itemTypes: [12],
} as const satisfies TemperItemCategoryTree
