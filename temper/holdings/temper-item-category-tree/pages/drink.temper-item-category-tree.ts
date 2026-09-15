import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drink = {
  id: "01a05fcf-f7de-7fc8-ae0d-63cfd9949c25",
  type: "page-type/temper-item-category-tree",
  slug: "drink",
  title: "Drink",
  parent: "consumables",
  displayOrder: 1,
  itemTypes: [12],
} as const satisfies TemperItemCategoryTree
