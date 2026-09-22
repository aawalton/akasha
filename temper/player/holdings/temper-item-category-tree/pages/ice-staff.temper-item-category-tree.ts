import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const iceStaff = {
  id: "01a05fcf-f822-7a20-b0b5-3e339b816ec1",
  type: "page-type/temper-item-category-tree",
  slug: "ice-staff",
  title: "Ice Staff",
  parent: "temper-item-category-tree/destruction-staff",
  displayOrder: 1,
  weaponTypes: [13],
} as const satisfies TemperItemCategoryTree
