import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const lightningStaff = {
  id: "01a05fcf-f829-7386-8d00-b9a35560931f",
  type: "temper-item-category-tree",
  slug: "lightning-staff",
  title: "Lightning Staff",
  parent: "destruction-staff",
  displayOrder: 2,
  weaponTypes: [15],
} as const satisfies TemperItemCategoryTree
