import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const surveyJewelry = {
  id: "01a05fcf-f842-7cf8-a4ab-9ea63ce9ca83",
  type: "temper-item-category-tree",
  slug: "survey-jewelry",
  title: "Jewelry Crafting",
  parent: "survey-reports",
  displayOrder: 3,
  itemNameContains: "Jewelry",
} as const satisfies TemperItemCategoryTree
