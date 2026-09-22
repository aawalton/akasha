import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSacredPieces = {
  id: "01a05fcf-f80b-7ed5-a324-9534bd6fe4d8",
  type: "page-type/temper-item-category-tree",
  slug: "furn-sacred-pieces",
  title: "Sacred Pieces",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 4,
  furnitureSubcategoryIds: [106],
} as const satisfies TemperItemCategoryTree
