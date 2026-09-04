import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const museumPieces = {
  id: "01a05fcf-f82f-768b-bf0d-6becdfabc22c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "museum-pieces",
  title: "Museum Pieces",
  parent: "tasks",
  displayOrder: 4,
  specializedItemTypes: [103],
} as const satisfies TemperItemCategoryTree
