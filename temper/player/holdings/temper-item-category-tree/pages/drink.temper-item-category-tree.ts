import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drink = {
  id: "01a05fcf-f7de-7fc8-ae0d-63cfd9949c25",
  type: "page-type/temper-item-category-tree",
  slug: "drink",
  title: "Drink",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 1,
  itemTypes: [12],
} as const satisfies TemperItemCategoryTree
