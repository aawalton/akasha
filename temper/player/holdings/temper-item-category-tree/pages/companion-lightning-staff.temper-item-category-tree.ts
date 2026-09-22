import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionLightningStaff = {
  id: "01a05fcf-f7cc-78e4-b59b-c05f0ce963ef",
  type: "page-type/temper-item-category-tree",
  slug: "companion-lightning-staff",
  title: "Lightning Staff",
  parent: "temper-item-category-tree/companion-destruction-staff",
  displayOrder: 2,
  weaponTypes: [15],
} as const satisfies TemperItemCategoryTree
