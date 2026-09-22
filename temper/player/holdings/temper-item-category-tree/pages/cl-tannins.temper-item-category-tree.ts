import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const clTannins = {
  id: "01a05fcf-f7c1-7551-b036-d59c9631928e",
  type: "page-type/temper-item-category-tree",
  slug: "cl-tannins",
  title: "Tannins",
  parent: "temper-item-category-tree/clothing",
  displayOrder: 3,
  itemTypes: [43],
} as const satisfies TemperItemCategoryTree
