import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const infernoStaff = {
  id: "01a05fcf-f822-7703-bf9c-976bcc064779",
  type: "page-type/temper-item-category-tree",
  slug: "inferno-staff",
  title: "Inferno Staff",
  parent: "temper-item-category-tree/destruction-staff",
  displayOrder: 0,
  weaponTypes: [12],
  createdAt: "2026-09-02T01:51:00.130Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
