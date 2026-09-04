import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const surveyClothing = {
  id: "01a05fcf-f841-72d2-8e2f-b6d486822684",
  pageTypeSlug: "temper-item-category-tree",
  slug: "survey-clothing",
  title: "Clothing",
  parent: "survey-reports",
  displayOrder: 1,
  itemNameContains: "Clothier",
} as const satisfies TemperItemCategoryTree
