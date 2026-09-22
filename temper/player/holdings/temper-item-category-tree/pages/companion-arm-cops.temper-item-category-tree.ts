import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionArmCops = {
  id: "01a05fcf-f7c2-7a7f-ae06-9c0282310998",
  type: "page-type/temper-item-category-tree",
  slug: "companion-arm-cops",
  title: "Arm Cops",
  parent: "temper-item-category-tree/companion-medium",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
