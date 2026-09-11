import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const surveyAlchemy = {
  id: "01a05fcf-f840-7ff5-8c39-98b76154fcbe",
  type: "temper-item-category-tree",
  slug: "survey-alchemy",
  title: "Alchemy",
  parent: "survey-reports",
  displayOrder: 5,
  itemNameContains: "Alchemist",
} as const satisfies TemperItemCategoryTree
