import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const surveyJewelry = {
  id: "01a05fcf-f842-7cf8-a4ab-9ea63ce9ca83",
  pageTypeSlug: "temper-item-category-tree",
  slug: "survey-jewelry",
  title: "Jewelry Crafting",
  parent: "survey-reports",
  displayOrder: 3,
  itemNameContains: "Jewelry",
} as const satisfies TemperItemCategoryTree
