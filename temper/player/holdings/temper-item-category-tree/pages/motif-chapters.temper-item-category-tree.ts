import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const motifChapters = {
  id: "01a05fcf-f82e-73c2-b6f4-3f9f33aa5e2f",
  type: "page-type/temper-item-category-tree",
  slug: "motif-chapters",
  title: "Motif Chapters",
  parent: "temper-item-category-tree/style-motifs",
  displayOrder: 1,
  specializedItemTypes: [61],
} as const satisfies TemperItemCategoryTree
