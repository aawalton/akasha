import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const stylePages = {
  id: "01a05fcf-f840-782c-94c9-6a98e6de9a77",
  type: "page-type/temper-item-category-tree",
  slug: "style-pages",
  title: "Style Pages",
  parent: "temper-item-category-tree/knowledge",
  displayOrder: 2,
  specializedItemTypes: [82],
} as const satisfies TemperItemCategoryTree
