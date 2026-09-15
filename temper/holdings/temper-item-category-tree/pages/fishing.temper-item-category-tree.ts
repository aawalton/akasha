import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const fishing = {
  id: "01a05fcf-f7e1-72eb-b43d-3eac79d6e19f",
  type: "page-type/temper-item-category-tree",
  slug: "fishing",
  title: "Fishing",
  parent: "provisioning",
  displayOrder: 2,
} as const satisfies TemperItemCategoryTree
