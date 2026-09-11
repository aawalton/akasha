import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const museumPieces = {
  id: "01a05fcf-f82f-768b-bf0d-6becdfabc22c",
  type: "temper-item-category-tree",
  slug: "museum-pieces",
  title: "Museum Pieces",
  parent: "tasks",
  displayOrder: 4,
  specializedItemTypes: [103],
} as const satisfies TemperItemCategoryTree
