import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const destructionStaff = {
  id: "01a05fcf-f7d9-77af-93ad-b970c36d1820",
  type: "page-type/temper-item-category-tree",
  slug: "destruction-staff",
  title: "Destruction Staff",
  parent: "temper-item-category-tree/weapons",
  displayOrder: 3,
  weaponTypes: [12, 13, 15],
} as const satisfies TemperItemCategoryTree
