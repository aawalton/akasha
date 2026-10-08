import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const museumPieces = {
  id: "01a05fcf-f82f-768b-bf0d-6becdfabc22c",
  type: "page-type/temper-item-category-tree",
  slug: "museum-pieces",
  title: "Museum Pieces",
  parent: "temper-item-category-tree/tasks",
  displayOrder: 4,
  specializedItemTypes: [103],
  createdAt: "2026-09-02T01:51:00.143Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
