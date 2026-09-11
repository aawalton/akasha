import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const surveyClothing = {
  id: "01a05fcf-f841-72d2-8e2f-b6d486822684",
  type: "temper-item-category-tree",
  slug: "survey-clothing",
  title: "Clothing",
  parent: "survey-reports",
  displayOrder: 1,
  itemNameContains: "Clothier",
} as const satisfies TemperItemCategoryTree
