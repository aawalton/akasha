import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const surveyClothing = {
  id: "01a05fcf-f841-72d2-8e2f-b6d486822684",
  type: "page-type/temper-item-category-tree",
  slug: "survey-clothing",
  title: "Clothing",
  parent: "temper-item-category-tree/survey-reports",
  displayOrder: 1,
  itemNameContains: "Clothier",
  createdAt: "2026-09-02T01:51:00.161Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
