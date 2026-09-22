import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const styleMotifs = {
  id: "01a05fcf-f840-7795-97b9-cc227882cacf",
  type: "page-type/temper-item-category-tree",
  slug: "style-motifs",
  title: "Style Motifs",
  parent: "temper-item-category-tree/knowledge",
  displayOrder: 1,
  itemTypes: [8],
} as const satisfies TemperItemCategoryTree
