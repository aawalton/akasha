import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const surveyProvisioning = {
  id: "01a05fcf-f842-7a52-9f5f-fa82a2905595",
  type: "page-type/temper-item-category-tree",
  slug: "survey-provisioning",
  title: "Provisioning",
  parent: "survey-reports",
  displayOrder: 6,
  itemNameContains: "Provisioner",
} as const satisfies TemperItemCategoryTree
