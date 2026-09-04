import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const surveyEnchanting = {
  id: "01a05fcf-f841-7612-aa69-eaf50924d736",
  pageTypeSlug: "temper-item-category-tree",
  slug: "survey-enchanting",
  title: "Enchanting",
  parent: "survey-reports",
  displayOrder: 4,
  itemNameContains: "Enchanter",
} as const satisfies TemperItemCategoryTree
