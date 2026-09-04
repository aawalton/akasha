import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnRecovery = {
  id: "01a05fcf-f80b-74c5-8483-ee723e701e55",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-recovery",
  title: "Recovery",
  parent: "furn-services",
  displayOrder: 9,
  furnitureSubcategoryIds: [197],
} as const satisfies TemperItemCategoryTree
