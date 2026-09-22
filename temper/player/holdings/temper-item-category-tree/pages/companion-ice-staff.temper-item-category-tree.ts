import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionIceStaff = {
  id: "01a05fcf-f7ca-79b6-b7b5-afb1e656c047",
  type: "page-type/temper-item-category-tree",
  slug: "companion-ice-staff",
  title: "Ice Staff",
  parent: "temper-item-category-tree/companion-destruction-staff",
  displayOrder: 1,
  weaponTypes: [13],
} as const satisfies TemperItemCategoryTree
