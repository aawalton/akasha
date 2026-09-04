import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const motifBooks = {
  id: "01a05fcf-f82e-7fc7-b7b5-59b8d47eaed9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "motif-books",
  title: "Motif Books",
  parent: "style-motifs",
  displayOrder: 0,
  specializedItemTypes: [60],
} as const satisfies TemperItemCategoryTree
