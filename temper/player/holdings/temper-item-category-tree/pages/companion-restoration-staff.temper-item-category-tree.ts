import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionRestorationStaff = {
  id: "01a05fcf-f7ce-721d-9618-5471d6dab934",
  type: "page-type/temper-item-category-tree",
  slug: "companion-restoration-staff",
  title: "Restoration Staff",
  parent: "temper-item-category-tree/companion-weapons",
  displayOrder: 4,
  weaponTypes: [9],
} as const satisfies TemperItemCategoryTree
