import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionInfernoStaff = {
  id: "01a05fcf-f7cb-7bdf-a904-8d9d893dad7f",
  type: "temper-item-category-tree",
  slug: "companion-inferno-staff",
  title: "Inferno Staff",
  parent: "companion-destruction-staff",
  displayOrder: 0,
  weaponTypes: [12],
} as const satisfies TemperItemCategoryTree
