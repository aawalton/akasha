import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const restorationStaff = {
  id: "01a05fcf-f838-778e-a9b5-94194af49d0f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "restoration-staff",
  title: "Restoration Staff",
  parent: "weapons",
  displayOrder: 4,
  weaponTypes: [9],
} as const satisfies TemperItemCategoryTree
