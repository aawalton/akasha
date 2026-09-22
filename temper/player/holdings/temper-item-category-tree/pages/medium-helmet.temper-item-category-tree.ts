import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mediumHelmet = {
  id: "01a05fcf-f82c-7262-b612-9638634a5e27",
  type: "page-type/temper-item-category-tree",
  slug: "medium-helmet",
  title: "Helmet",
  parent: "temper-item-category-tree/medium-armor",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
