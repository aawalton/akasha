import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const infernoStaff = {
  id: "01a05fcf-f822-7703-bf9c-976bcc064779",
  pageTypeSlug: "temper-item-category-tree",
  slug: "inferno-staff",
  title: "Inferno Staff",
  parent: "destruction-staff",
  displayOrder: 0,
  weaponTypes: [12],
} as const satisfies TemperItemCategoryTree
