import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const fishing = {
  id: "01a05fcf-f7e1-72eb-b43d-3eac79d6e19f",
  type: "page-type/temper-item-category-tree",
  slug: "fishing",
  title: "Fishing",
  parent: "temper-item-category-tree/provisioning",
  displayOrder: 2,
} as const satisfies TemperItemCategoryTree
