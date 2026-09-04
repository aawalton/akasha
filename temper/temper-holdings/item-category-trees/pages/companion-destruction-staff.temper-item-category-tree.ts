import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionDestructionStaff = {
  id: "01a05fcf-f7c6-744b-a7d5-7cd76987c768",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-destruction-staff",
  title: "Destruction Staff",
  parent: "companion-weapons",
  displayOrder: 3,
  weaponTypes: [12, 13, 15],
} as const satisfies TemperItemCategoryTree
