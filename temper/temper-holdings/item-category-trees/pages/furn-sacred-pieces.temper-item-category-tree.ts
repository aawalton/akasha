import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnSacredPieces = {
  id: "01a05fcf-f80b-7ed5-a324-9534bd6fe4d8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-sacred-pieces",
  title: "Sacred Pieces",
  parent: "furn-undercroft",
  displayOrder: 4,
  furnitureSubcategoryIds: [106],
} as const satisfies TemperItemCategoryTree
